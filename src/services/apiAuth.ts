import { env } from "@/utils";
import { supabase } from "@/services";

export const signUp = async ({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: "" },
    },
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data?.user;
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const updateUser = async ({
  fullName,
  avatar,
  password,
}: {
  fullName?: string;
  avatar?: File | null;
  password?: string;
}) => {
  let updatedUser = {};

  if (password) {
    updatedUser = {
      password,
    };
  }
  if (fullName) {
    updatedUser = {
      data: {
        fullName,
      },
    };
  }
  const { data, error: userError } = await supabase.auth.updateUser(
    updatedUser
  );

  if (userError) {
    console.error(userError);
    throw new Error(userError.message);
  }

  if (!avatar) {
    return data;
  }

  const fieldName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: avatarError } = await supabase.storage
    .from("avatars")
    .upload(fieldName, avatar);

  if (avatarError) {
    console.error(avatarError);
    throw new Error(avatarError.message);
  }

  const { data: updatedAvatarUser, error: avatarUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fieldName}`,
      },
    });

  if (avatarUserError) {
    console.error(avatarUserError);
    throw new Error(avatarUserError.message);
  }

  return updatedAvatarUser;
};
