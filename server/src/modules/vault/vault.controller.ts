import { logger } from "@typegoose/typegoose/lib/logSettings";
import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify";
import { get } from "lodash";
import { updateVault } from "./vault.service";

export async function updateVaultHandler(request: FastifyRequest<{Body:{
    encryptedVault:string;
};
}>,
    reply: FastifyReply
){
    const userId = get(request,"user._id");
    try {
        await updateVault({
            data: request.body.encryptedVault,
            userId
        });
        return reply.code(200).send("Vault Updated");
    } catch (e) {
        logger.error(e,'error updating vault');
        return reply.code(500).send(e); 
    }
}