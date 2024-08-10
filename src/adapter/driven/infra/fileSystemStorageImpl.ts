import * as fs from 'fs';
import * as path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

import { MultipartFile } from '@fastify/multipart';
import { FileSystemStorage } from '@src/core/application/ports/output/fileSystemStorage';

const pump = promisify(pipeline);

export class FileSystemStorageImpl implements FileSystemStorage {
	async saveFile(file: MultipartFile, productId: string): Promise<string> {
		const uploadDir = path.join(__dirname, `/../../../uploads/${productId}`);
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true });
		}

		const filePath = path.join(uploadDir, file.filename);
		await pump(file.file, fs.createWriteStream(filePath));

		return `/uploads/${productId}/${file.filename}`;
	}

	async deleteFile(filePath: string): Promise<void> {
		const absolutePath = path.join(__dirname, `/../../../${filePath}`);
		if (fs.existsSync(absolutePath)) {
			fs.unlinkSync(absolutePath);
		}
	}

	async deleteDirectory(directoryPath: string): Promise<void> {
		const absolutePath = path.join(__dirname, `/../../../${directoryPath}`);
		if (fs.existsSync(absolutePath)) {
			const files = fs.readdirSync(absolutePath);
			files.forEach((file) => {
				fs.unlinkSync(path.join(absolutePath, file));
			});
			fs.rmdirSync(absolutePath);
		}
	}
}
