/**



 // IMAGE CONFIGURATION (config.js)
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

export const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
export const getSerialForImage = (filename: string) => {
	const ext = path.parse(filename).ext;
	return uuidv4() + ext;
};



 // IMAGE UPLOADER (member.resolver.ts)
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';

@UseGuards(AuthGuard)
@Mutation((returns) => String)
public async imageUploader(
	@Args({ name: 'file', type: () => GraphQLUpload })
{ createReadStream, filename, mimetype }: FileUpload,
@Args('target') target: String,
): Promise<string> {
	console.log('Mutation: imageUploader');

	if (!filename) throw new Error(Message.UPLOAD_FAILED);
const validMime = validMimeTypes.includes(mimetype);
if (!validMime) throw new Error(Message.PROVIDE_ALLOWED_FORMAT);

const imageName = getSerialForImage(filename);
const url = `uploads/${target}/${imageName}`;
const stream = createReadStream();

const result = await new Promise((resolve, reject) => {
	stream
		.pipe(createWriteStream(url))
		.on('finish', async () => resolve(true))
		.on('error', () => reject(false));
});
if (!result) throw new Error(Message.UPLOAD_FAILED);

return url;
}

@UseGuards(AuthGuard)
@Mutation((returns) => [String])
public async imagesUploader(
	@Args('files', { type: () => [GraphQLUpload] })
files: Promise<FileUpload>[],
@Args('target') target: String,
): Promise<string[]> {
	console.log('Mutation: imagesUploader');

	const uploadedImages = [];
	const promisedList = files.map(async (img: Promise<FileUpload>, index: number): Promise<Promise<void>> => {
		try {
			const { filename, mimetype, encoding, createReadStream } = await img;

			const validMime = validMimeTypes.includes(mimetype);
			if (!validMime) throw new Error(Message.PROVIDE_ALLOWED_FORMAT);

			const imageName = getSerialForImage(filename);
			const url = `uploads/${target}/${imageName}`;
			const stream = createReadStream();

			const result = await new Promise((resolve, reject) => {
				stream
					.pipe(createWriteStream(url))
					.on('finish', () => resolve(true))
					.on('error', () => reject(false));
			});
			if (!result) throw new Error(Message.UPLOAD_FAILED);

			uploadedImages[index] = url;
		} catch (err) {
			console.log('Error, file missing!');
		}
	});

	await Promise.all(promisedList);
	return uploadedImages;
}



 // POSTMAN
 imageUploader
 operations: { "query": "mutation ImageUploader($file: Upload!, $target: String!) { imageUploader(file: $file, target: $target) }", "variables": { "file": null, "target": "member" }}
 map: { "0": ["variables.file"] }
 0: File

 imagesUploader
 operations: { "query": "mutation ImagesUploader($files: [Upload!]!, $target: String!) { imagesUploader(files: $files, target: $target) }", "variables": { "files": [null, null, null, null], "target": "property" }}
 map: { "0": ["variables.files.0"], "1": ["variables.files.1"], "2": ["variables.files.2"], "3": ["variables.files.3"], "4": ["variables.files.4"] }
 0: File
 1: File
 2: File
 3: File
 4: File

 **/
