export const userDTO = (data) => {
  return {
    user_id: data._id,
    first_name: data.first_name,
    last_name: data.last_name,
    username: data.nickname,
    phone: data.phone || null,
    email: data.email,
    role: data.role,
    thumbnail: data.thumbnail || null,
    vehicles: data.vehicles || null,
    created_at: data.createdAt,
    updated_at: data.updatedAt,
  };
};
