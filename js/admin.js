console.log("Proyecto X - Super Panel iniciado");

async function loadDashboard() {
  const businessesElement = document.getElementById("businesses");

  try {
    const response = await fetch(
      `${SUPABASE_REST}/businesses?select=id`,
      {
        method: "GET",
        headers: supabaseHeaders()
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const businesses = await response.json();

    businessesElement.textContent = businesses.length;
  } catch (error) {
    console.error("Error cargando comercios:", error);
    businessesElement.textContent = "Error";
  }
}

loadDashboard();
