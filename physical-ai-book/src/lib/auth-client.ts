import { createAuthClient } from "better-auth/react";
import siteConfig from '@generated/docusaurus.config';

const getAuthUrl = () => {
  return (siteConfig.customFields?.authUrl as string) || "http://localhost:3001";
};

export const authClient = createAuthClient({
  baseURL: getAuthUrl(), 
});