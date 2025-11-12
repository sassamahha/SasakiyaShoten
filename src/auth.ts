export const auth = async () => null;

export const signIn = async (..._args: unknown[]) => {
  throw new Error("signIn is not implemented in the auth stub.");
};

export const signOut = async (..._args: unknown[]) => {};

export const handlers = {
  GET: () => new Response(null, { status: 404 }),
  POST: () => new Response(null, { status: 404 })
};
