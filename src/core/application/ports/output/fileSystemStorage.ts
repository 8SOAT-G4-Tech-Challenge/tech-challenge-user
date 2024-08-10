import { Multipart } from '@fastify/multipart';

export interface FileSystemStorage {
	saveFile(file: Multipart, productId: string): Promise<string>;
	deleteFile(filePath: string): Promise<void>;
	deleteDirectory(directoryPath: string): Promise<void>;
}
