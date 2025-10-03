import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            // Note: Using 'slug' as the document ID requires you to ensure it's unique.
            // A common alternative is to use ID.unique() and store the slug as a field.
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // Document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            return false; // FIXED: Return false on error for consistency
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // Document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            return false; // FIXED: Return false on error for consistency
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug // Document ID
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug // Document ID
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // --- File Upload Service ---

    async uploadFile(file) {
        try {
            // Make uploaded files publicly readable so preview URLs work for all visitors
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file,
            });
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    // getFilePreview(featuredImage) {
    //     // Return a fully-qualified preview URL so components can use it directly
    //     if (!featuredImage) return null;
    //     // Appwrite preview endpoint: {endpoint}/storage/buckets/{bucketId}/files/{fileId}/preview
    //     // We ensure no trailing slash duplication.
    //     const endpoint = String(conf.appwriteUrl).replace(/\/$/, '');
    //     return `${endpoint}/storage/buckets/${conf.appwriteBucketId}/files/${featuredImage}/view`;
    // }

    // getFilePreview(fileId){
        // return this.bucket.getFilePreview(
    //         conf.appwriteBucketId,
    //         fileId
    //     )
    // }
    getFilePreview(fileId){
        if (!fileId) return null;
        const endpoint = String(conf.appwriteUrl).replace(/\/$/, '');
        // Use the view endpoint so browsers can render the file inline
        return `${endpoint}/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/view`;
    }
    
    // A more flexible version with optional parameters
// async getFilePreview(fileId, options = {}) { 
//     try {
//         const { width, height, quality } = options;
//         const previewUrl = await this.bucket.getFileView(
//             conf.appwriteBucketId,
//             fileId,
//             width,     // Pass width (will be undefined if not provided)
//             height,    // Pass height
//             undefined, // gravity
//             quality    // Pass quality
//         );
//         return previewUrl.href;
//     } catch (error) {
//         console.error("Error getting file preview:", error);
//         return null;
//     }
// }

// Example usage with options:
// Usage example should be placed inside an async function or in your component logic, not here.
}

const service = new Service();
export default service;