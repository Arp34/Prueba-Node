import { CustomRequestPayload } from "../middlewares/auth.middleware.js";

declare global {
    namespace Express {
        interface Request {
            user?: CustomRequestPayload;
        }
    }
}
