async function load_components() {
    const load = async (id, file) => {
        const res = await fetch(file);
        const html = await res.text();
        document.getElementById(id).innerHTML = html;
    };
    await load("header", "../components/header.html");
    await load("footer", "../components/footer.html");
}

load_components();