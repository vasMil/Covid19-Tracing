export function redirectIfTokenMissing() {
    if(!localStorage.getItem("token") && !sessionStorage.getItem("token")) {
        window.location.replace(`${window.location.origin}/src/app/login-page/login.php`);
    }
}

// Redirects to login page if the api returns 401 (Unauthorized)
// Cleans both the local and the session storage
export async function safe_fetch(fetchRequest) {
    redirectIfTokenMissing();
    try {
        const resp = await fetchRequest;
        if (resp.status == 401) {
            window.location.replace(`${window.location.origin}/src/app/login-page/login.php`);
            localStorage.clear();
            sessionStorage.clear();
        }
        const respJson = await resp.json();
        return respJson;
    }
    catch(err) {
        console.log(err);
        throw err;
    }
}
