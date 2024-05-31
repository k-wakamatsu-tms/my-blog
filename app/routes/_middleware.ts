import { createRoute } from "honox/factory";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

export default createRoute(logger(), secureHeaders());
