import {ContentTypes, NavigationItem} from "./repositories/Navigation/types";
import {getNavigationJson} from "./repositories/Navigation/request";

export async function flattenNavigationRoute(
    id: string
): Promise<NavigationItem[]> {
    let dataFetched = await getNavigationJson(id);
    let childIds: string[] = dataFetched
        .filter((x) => x.__typename == ContentTypes.NavigationGroup)
        .map((x) => x.sys?.id ?? "INVALID")
        .filter((x) => x != "INVALID");
    for (const childId of childIds) {
        dataFetched = dataFetched.concat(await flattenNavigationRoute(childId));
    }
    return dataFetched;
}
