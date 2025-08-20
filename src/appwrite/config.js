import conf from "../conf/conf";  // imports all the environmetnal variables

import { Client , ID , Databases , Storage , Query} from "appwrite"

export class Service{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.url)
            .setProject(conf.ProjectId);

            this.databases = new Databases(client)
            this.storage = new Storage(client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.DatabaseId,
                conf.CollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log(error);
            
        }
    }

    async updatePost(slug ,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.DatabaseId,
                conf.CollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log(error);
            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.DatabaseId,
                conf.CollectionId,
                slug,
            )
            return true
        } catch (error) {
            console.log(error);
            return false
        }   
    }

    async getPost(slug){

        try {
            return await this.databases.getDocument(
                conf.DatabaseId,
                conf.CollectionId,
                slug,
            )
        } catch (error) {
            console.log(error);
            return false
            
        }
    }

    async getPosts(queries = [Query.equal("status" , "active")]){
        try {
            return await this.databases.listDocuments(
                conf.DatabaseId,
                conf.CollectionId,
                queries,
            )
        } catch (error) {
            console.log(error);
            
        }
    }

    //file upload method

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.BucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log(error);
            return false;
            
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                conf.BucketId,
                fileId,
            )
            return true
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.BucketId,
            fileId
        )
    }




}

const service = new Service();
export default service