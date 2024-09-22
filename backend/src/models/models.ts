import { prisma } from "../../prisma/connect";

export async function createUser(data: { user_id: string; name: string; email: string }) {
    try {
        const user = await prisma.user.create({ data: { id: data.user_id, name: data.name, email: data.email } });
        return user;
    } catch (err) {
        throw err;
    }
}

export async function getUser(authSlug: string) {
    try {
        const user = await prisma.user.findUnique({ where: { id: authSlug } });
        return user;
    } catch (err) {
        throw err;
    }
}
