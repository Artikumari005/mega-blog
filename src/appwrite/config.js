import conf from "../conf/conf";
import {Client , ID ,Databases, Storage,Query } from "appwrite";

export class Service{
    Client = new Client();
    databases;
    bucket;
    constructor(){
        this.Client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases= new Databases(this.Client);
        this.bucket= new Storage(this.Client);
    }
    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // Using slug as the document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            throw error;
        }
    }
    async updatePost(slug , {title, content, featuredImage, status,
         }){
            try{
return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                    {
                        title, content, featuredImage, status
                    }
                )

            }catch(error){
                throw error;
            }
         }
    async deletePost(slug){
            try{
               await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug
                )
                return true;

            }catch(error){
                throw error;
                return false;
            }
         }
         async getPost(slug){
            try{
return await this.databases.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug
                )

            }catch(error){
                throw error;
                return false;
            }
         }
         async getPosts(queries =[Query.equal("status", "active")]){
            try{

                return await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    queries,
                )
            }
            catch(error){
                throw error;
            }
         }
         //file upload file
         async uploadFile(file){
            try{
                return await this.bucket.createFile(
                    conf.appwriteBucketId,
                    ID.unique(),
                    file
                )

            }
            catch(error){
                console.log(" service :: uploadFile :: error", error);
                return false;
            }
         }
         async deleteFile(fileId){
            try{

                return await this.bucket.deleteFile(
                    conf.appwriteBucketId,
                    fileId
                )
                return true;
            }catch(error){
                 console.log(" service :: deleteFile :: error", error);
                return false;
            }
         }
         getFilePreview(fileId) {
            console.log("getFilePreview called with fileId:", fileId);
            if (!fileId) {
                console.log("No fileId provided");
                return "";
            }
            try {
                // Use getFileView instead of getFilePreview (free plan doesn't support transformations)
                const url = this.bucket.getFileView(
                    conf.appwriteBucketId,
                    fileId
                );
                console.log("File preview URL:", url.toString());
                return url.toString();
            } catch (error) {
                console.error("Error getting file preview:", error);
                return "";
            }
         }

}




const services =  new Service();
export default services;
