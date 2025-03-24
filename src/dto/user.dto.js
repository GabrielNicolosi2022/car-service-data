export const userDTO = (data) => {
  return {
    first_name: data.first_name,
    last_name: data.last_name,
    username: data.username,
    phone: data.phone || null,
    email: data.email || null,
    thumbnail: data.thumbnail || null,
    vehicles: data.vehicles || null,
    last_updated: data.updatedAt,
  };
};
