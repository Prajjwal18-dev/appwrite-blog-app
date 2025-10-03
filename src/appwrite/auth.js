import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // If account creation is successful, automatically log the user in
                return this.login(email, password);
            } else {
                // This part of the original code was unreachable, but we'll keep the structure
                // in case the API behavior changes. It's safer to just return the (falsy) userAccount.
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite service :: createAccount :: error", error);
            // IMPROVED: Instead of throwing, return null so the UI can handle it gracefully.
            return null;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Login to Continue", error);
        }
    }

    // async login(arg1, arg2) {
    //     // Support both shapes: login({email, password}) and login(email, password)
    //     let email, password;
    //     if (typeof arg1 === 'object' && arg1 !== null) {
    //         ({ email, password } = arg1);
    //     } else {
    //         email = arg1;
    //         password = arg2;
    //     }

    //     try {
    //         return await this.account.createEmailPasswordSession(email, password);
    //     } catch (error) {
    //         console.log("Appwrite service :: login :: error", error);
    //         return null;
    //     }
    // }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch {
            // This is expected if the user is not logged in.
            // We don't need to log every instance of this.
            return null; // IMPROVED: Moved return null here for clarity
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            return true; // IMPROVED: Return true on success
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
            return false; // IMPROVED: Return false on failure
        }
    }
}

const authService = new AuthService();

export default authService;