// this doesn't handle boolean parameters e.g. foo.com?bool
// getUrlParameter("bool") and getUrlParameter("nonexistent") both return ""
export const getUrlParameter = (name: string) => {
    const sanitizedName = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

    const regex = new RegExp(`[\\?&]${sanitizedName}=([^&#]*)`);
    const results = regex.exec(window.location.search);

    if (results === null) {
        return "";
    }

    return decodeURIComponent(results[1].replace(/\+/g, " "));
};