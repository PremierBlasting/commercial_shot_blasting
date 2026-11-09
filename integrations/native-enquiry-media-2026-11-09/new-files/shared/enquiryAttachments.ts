export const MIB = 1024 * 1024;
export const MAX_ENQUIRY_FILES = 20;
export const MAX_PHOTO_BYTES = 100 * MIB;
export const MAX_VIDEO_BYTES = 250 * MIB;
export const MAX_ENQUIRY_TOTAL_BYTES = 500 * MIB;
export const ENQUIRY_CHUNK_BYTES = MIB;
export const ENQUIRY_UPLOAD_TTL_MS = 30 * 60 * 1000;
export type EnquiryMediaKind = "photo" | "video" | "document";
export interface EnquiryMediaFormat { kind: EnquiryMediaKind; mime: string; extensions: readonly string[] }
export const ENQUIRY_MEDIA_FORMATS: readonly EnquiryMediaFormat[] = [
  {kind:"photo",mime:"image/jpeg",extensions:["jpg","jpeg","jpe","jfif"]},
  {kind:"photo",mime:"image/png",extensions:["png","apng"]},
  {kind:"photo",mime:"image/webp",extensions:["webp"]},
  {kind:"photo",mime:"image/gif",extensions:["gif"]},
  {kind:"photo",mime:"image/heic",extensions:["heic"]},
  {kind:"photo",mime:"image/heif",extensions:["heif","hif"]},
  {kind:"photo",mime:"image/avif",extensions:["avif"]},
  {kind:"photo",mime:"image/tiff",extensions:["tif","tiff"]},
  {kind:"photo",mime:"image/bmp",extensions:["bmp","dib"]},
  {kind:"photo",mime:"image/jxl",extensions:["jxl"]},
  {kind:"photo",mime:"image/jp2",extensions:["jp2"]},
  {kind:"photo",mime:"image/x-canon-cr2",extensions:["cr2"]},
  {kind:"photo",mime:"image/x-canon-cr3",extensions:["cr3"]},
  {kind:"photo",mime:"image/x-adobe-dng",extensions:["dng"]},
  {kind:"photo",mime:"image/x-nikon-nef",extensions:["nef"]},
  {kind:"photo",mime:"image/x-sony-arw",extensions:["arw"]},
  {kind:"photo",mime:"image/x-olympus-orf",extensions:["orf"]},
  {kind:"photo",mime:"image/x-panasonic-rw2",extensions:["rw2"]},
  {kind:"photo",mime:"image/x-fujifilm-raf",extensions:["raf"]},
  {kind:"photo",mime:"image/x-raw",extensions:["raw"]},
  {kind:"video",mime:"video/mp4",extensions:["mp4","m4v"]},
  {kind:"video",mime:"video/quicktime",extensions:["mov","qt"]},
  {kind:"video",mime:"video/webm",extensions:["webm"]},
  {kind:"video",mime:"video/x-msvideo",extensions:["avi"]},
  {kind:"video",mime:"video/x-matroska",extensions:["mkv"]},
  {kind:"video",mime:"video/mpeg",extensions:["mpg","mpeg","mpe","m2v"]},
  {kind:"video",mime:"video/3gpp",extensions:["3gp"]},
  {kind:"video",mime:"video/3gpp2",extensions:["3g2"]},
  {kind:"video",mime:"video/x-ms-wmv",extensions:["wmv","asf"]},
  {kind:"video",mime:"video/mp2t",extensions:["mts","m2ts","ts"]},
  {kind:"video",mime:"video/x-flv",extensions:["flv"]},
  {kind:"document",mime:"application/pdf",extensions:["pdf"]},
];
const MIME_ALIASES: Record<string,string> = {"image/jpg":"image/jpeg","image/pjpeg":"image/jpeg","image/x-png":"image/png","video/x-m4v":"video/mp4","video/avi":"video/x-msvideo","image/x-ms-bmp":"image/bmp","image/heic-sequence":"image/heic","image/heif-sequence":"image/heif","video/x-mpeg":"video/mpeg"};
export const ENQUIRY_ATTACHMENT_ACCEPT = Array.from(new Set(ENQUIRY_MEDIA_FORMATS.flatMap(f=>[f.mime,...f.extensions.map(e=>`.${e}`)]))).join(",");
/** Filename fallback fixes missing/generic browser MIME; server verifies actual bytes before storage. */
export function enquiryMediaFormat(file:{name:string;type?:string}): EnquiryMediaFormat | undefined {
  const ext=file.name.includes(".")?file.name.split(".").pop()!.toLowerCase():"";
  if(ext) return ENQUIRY_MEDIA_FORMATS.find(f=>f.extensions.includes(ext));
  const raw=(file.type??"").split(";")[0].trim().toLowerCase();
  return ENQUIRY_MEDIA_FORMATS.find(f=>f.mime===(MIME_ALIASES[raw]??raw));
}
export function enquiryAttachmentLimit(format:EnquiryMediaFormat):number { return format.kind==="video"?MAX_VIDEO_BYTES:MAX_PHOTO_BYTES; }
export function formatAttachmentSize(bytes:number):string {
  if(bytes>=MIB)return `${(bytes/MIB).toFixed(bytes>=10*MIB?0:1)} MB`;
  return `${Math.max(1,Math.round(bytes/1024))} KB`;
}
export function attachmentSelectionError(file:{name:string;type?:string;size:number}):string | undefined {
 const format=enquiryMediaFormat(file);
 if(!format)return `${file.name}: please choose a photo, video or PDF. This file type is not supported.`;
 if(!file.size)return `${file.name}: this file is empty. Please choose the original file again.`;
 if(file.name.length>160)return `${file.name.slice(0,45)}…: please shorten the filename to 160 characters or fewer.`;
 const max=enquiryAttachmentLimit(format);
 if(file.size>max)return `${file.name}: ${format.kind==="video"?"videos":"photos and PDFs"} can be up to ${max/MIB} MB each. This file is ${formatAttachmentSize(file.size)}.`;
 return undefined;
}
export function selectEnquiryAttachments<T extends {name:string;type?:string;size:number;lastModified?:number}>(existing:readonly T[], incoming:readonly T[]):{files:T[];errors:string[]} {
 const files=[...existing],errors:string[]=[];let total=files.reduce((sum,f)=>sum+f.size,0);
 for(const file of incoming){
  const problem=attachmentSelectionError(file);if(problem){errors.push(problem);continue;}
  if(files.some(f=>f.name===file.name&&f.size===file.size&&f.lastModified===file.lastModified))continue;
  if(files.length>=MAX_ENQUIRY_FILES){errors.push(`${file.name}: you can add up to ${MAX_ENQUIRY_FILES} files.`);continue;}
  if(total+file.size>MAX_ENQUIRY_TOTAL_BYTES){errors.push(`${file.name}: please keep the total below 500 MB, or send fewer files.`);continue;}
  files.push(file);total+=file.size;
 }
 return {files,errors};
}
