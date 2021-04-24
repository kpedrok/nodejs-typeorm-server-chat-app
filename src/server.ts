import { http } from "./http";
import "./websocket/admin";
import "./websocket/client";

http.listen(3333, () => console.log("Server started on 3333"));
