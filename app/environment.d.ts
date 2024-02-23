declare global {
   namespace NodeJS {
      interface ProcessEnv {
         NODE_ENV: "development" | "production";
         PORT?: string;
         SANITY_PROJECT_ID: string;
         SANITY_TOKEN: string;
         SANITY_DATASET?: string;
      }
   }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
