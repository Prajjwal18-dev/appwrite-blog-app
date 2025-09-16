// Universal code for any appwrite backend used in future

import conf from "../conf/conf";  // imports all the environmetnal variables

import { Client , Account , ID } from "appwrite"


export class AuthService {           //new class created and exported
        client = new Client();
        account;

        constructor(){  // when ever class is created and constructor is called this runs
            this.client
                .setEndpoint(conf.url)
                .setProject(conf.ProjectId);
            
            this.account = new Account(this.client);
        }

        async createAccount({email,password,name}){
            try {
                const userAccount = await this.account.create(ID.unique(),email,password,name)
                if(userAccount){
                    //redirect - logged in
                    return this.login({email,password})
                }else {
                    return userAccount
                }
            } catch (error) {
                throw error
            }
        }

        async login({email,password}){
            try {
                return await this.account.createEmailPasswordSession(email,password)
            } catch (error) {
                // throw error
                console.log("Login error ", error);
                
            }
        }

        async getCurrentUser(){   // to check if logged in or not
            try {
                return await this.account.get();
            } catch (error) {
                console.log("Appwrite getCurrentUser Error: ", error);
                
            }
            return null;
        }

        async logout(){
            try {
                await this.account.deleteSessions();
            } catch (error) {
                console.log("logout error ",error);
                
            }
        }

}     

const authService = new AuthService();

export default authService