import { connect } from "@helpers/api.helper";
import { getUser } from "../helpers/session.helper";

export function uploadAssets(params) {
    const user = getUser();
    params.append("company_id", user.company_id);
    params.append("created_by", `${user.first_name} ${user.last_name}`);

    return connect().post("/assets", params, {
        onUploadProgress: (ProgressEvent) => {
            let progress =
                Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
                "%";
        },
    });
}
