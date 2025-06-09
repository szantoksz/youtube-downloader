export async function change_version_text(text) { 
    document.getElementById("version_number").textContent = text;
}

export function read_version_text() { 
    return document.getElementById("version_number").textContent;
}