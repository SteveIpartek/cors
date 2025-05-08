async function buscarPersonaje() {
    const name = document.getElementById('search').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Cargando...';

    try {
      const response = await fetch(`http://localhost:3000/characters/${name}`);
      if (!response.ok) throw new Error('Personaje no encontrado');

      const personaje = await response.json();
      resultDiv.innerHTML = `
        <div class="card">
          <h2>${personaje.name}</h2>
          <img src="${personaje.image}" alt="${personaje.name}" />
          <p><strong>Status:</strong> ${personaje.status}</p>
          <p><strong>Species:</strong> ${personaje.species}</p>
          <p><strong>Gender:</strong> ${personaje.gender}</p>
          <p><strong>Origin:</strong> ${personaje.origin.name}</p>
        </div>
      `;
    } catch (error) {
      resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
  }