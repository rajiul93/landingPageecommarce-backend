export type CreateImagePayload = {
  siteName:string;
  logo: {
    url: string;
    alt?: string;
  };
  favIcon: {
    url: string;
    alt?: string;
  };
};
