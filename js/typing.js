  const textos = [
    "Tarefas",
    "Compras",
    "Lembretes",
    "Tarefas do dia",
    "Metas do dia"
  ];

  let i = 0;      
  let j = 0;      
  let apagando = false;
  const elemento = document.getElementById("auto-type");

  function loop() {
    const frase = textos[i];

    if (!apagando) {
      elemento.textContent = frase.substring(0, j + 1);
      j++;
      if (j === frase.length) {
        apagando = true;
        setTimeout(loop, 1500); 
        return;
      }
    } else {
      elemento.textContent = frase.substring(0, j - 1);
      j--;
      if (j === 0) {
        apagando = false;
        i = (i + 1) % textos.length;
      }
    }

    setTimeout(loop, apagando ? 50 : 100);
  }

  loop();