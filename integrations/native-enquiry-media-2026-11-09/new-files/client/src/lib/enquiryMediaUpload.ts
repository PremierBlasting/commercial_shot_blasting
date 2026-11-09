import { ENQUIRY_CHUNK_BYTES, enquiryMediaFormat, attachmentSelectionError } from "@shared/enquiryAttachments";
export interface UploadedEnquiryMedia { fileName:string;url:string;key:string }
export interface EnquiryMediaUploadApi {
 begin(input:{fileName:string;contentType:string;size:number}):Promise<{uploadId:string;chunkSize:number}>;
 chunk(input:{uploadId:string;chunkIndex:number;fileData:string}):Promise<{receivedBytes:number}>;
 finish(input:{uploadId:string}):Promise<UploadedEnquiryMedia>;
 cancel(input:{uploadId:string}):Promise<unknown>;
}
export interface EnquiryUploadProgress { sentBytes:number;totalBytes:number;phase:"uploading"|"finishing" }
const WAIT_MS=60000;
export function boundedUploadCall<T>(run:()=>Promise<T>,timeoutMs=WAIT_MS):Promise<T> {
 return new Promise((resolve,reject)=>{
  const timer=setTimeout(()=>reject(new Error("The upload took too long. Please retry, or send your enquiry without files.")),timeoutMs);
  Promise.resolve().then(run).then(value=>{clearTimeout(timer);resolve(value)},error=>{clearTimeout(timer);reject(error)});
 });
}
const transient=(error:unknown):boolean=>{
 const e=error as {data?:{httpStatus?:number;code?:string}};
 const status=e?.data?.httpStatus;
 return !status || status>=500 || status===408 || status===429 || e?.data?.code==="CONFLICT";
};
async function retryCall<T>(run:()=>Promise<T>):Promise<T>{
 for(let attempt=0;;attempt++){
  try{return await boundedUploadCall(run)}catch(error){if(attempt>=2||!transient(error))throw error;await new Promise(resolve=>setTimeout(resolve,500*(attempt+1)));}
 }
}
export function readEnquiryChunk(blob:Blob):Promise<string>{
 if(typeof FileReader==="undefined")return blob.arrayBuffer().then(buffer=>{const bytes=new Uint8Array(buffer);let text="";for(let i=0;i<bytes.length;i++)text+=String.fromCharCode(bytes[i]);return btoa(text)});
 return new Promise((resolve,reject)=>{
  const reader=new FileReader();const timer=setTimeout(()=>{reader.abort();reject(new Error("We could not read that file. Please choose the original file again."))},30000);
  reader.onerror=()=>{clearTimeout(timer);reject(new Error("We could not read that file. Please choose the original file again."))};
  reader.onabort=()=>{clearTimeout(timer);reject(new Error("Reading the file was interrupted. Please try again."))};
  reader.onload=()=>{clearTimeout(timer);const result=String(reader.result??"");const data=result.slice(result.indexOf(",")+1);if(!data)reject(new Error("This file could not be read. Please try again."));else resolve(data)};
  reader.readAsDataURL(blob);
 });
}
/** No conversion or whole-file read: originals are sent one 1 MiB slice at a time. */
export async function uploadEnquiryFile(file:File,api:EnquiryMediaUploadApi,onProgress:(progress:EnquiryUploadProgress)=>void):Promise<UploadedEnquiryMedia>{
 const problem=attachmentSelectionError(file);if(problem)throw new Error(problem);
 const format=enquiryMediaFormat(file)!;let uploadId:string|undefined;
 try{
  const begun=await boundedUploadCall(()=>api.begin({fileName:file.name,contentType:format.mime,size:file.size}));uploadId=begun.uploadId;
  if(!uploadId||begun.chunkSize!==ENQUIRY_CHUNK_BYTES)throw new Error("We could not start that upload. Please retry.");
  onProgress({sentBytes:0,totalBytes:file.size,phase:"uploading"});
  for(let offset=0,index=0;offset<file.size;offset+=ENQUIRY_CHUNK_BYTES,index++){
   const fileData=await readEnquiryChunk(file.slice(offset,Math.min(file.size,offset+ENQUIRY_CHUNK_BYTES)));
   const result=await retryCall(()=>api.chunk({uploadId:uploadId!,chunkIndex:index,fileData}));
   const expected=Math.min(file.size,offset+ENQUIRY_CHUNK_BYTES);
   if(!Number.isSafeInteger(result.receivedBytes)||result.receivedBytes<expected||result.receivedBytes>file.size)throw new Error("The upload was interrupted. Please retry that file.");
   onProgress({sentBytes:expected,totalBytes:file.size,phase:"uploading"});
  }
  onProgress({sentBytes:file.size,totalBytes:file.size,phase:"finishing"});
  const result=await retryCall(()=>api.finish({uploadId:uploadId!}));
  if(!result.url||!result.key||!result.fileName)throw new Error("The file did not finish uploading. Please retry.");
  return result;
 }catch(error){
  if(uploadId)void api.cancel({uploadId}).catch(()=>undefined);
  const e=error as {data?:{httpStatus?:number}};
  if(e?.data?.httpStatus===413)throw new Error("The connection rejected this upload. Please retry or send your enquiry without files.");
  if(e?.data?.httpStatus&&e.data.httpStatus>=500)throw new Error("We could not upload this file just now. Please retry or send your enquiry without files.");
  throw error instanceof Error?error:new Error("We could not upload this file. Please retry or send your enquiry without files.");
 }
}
