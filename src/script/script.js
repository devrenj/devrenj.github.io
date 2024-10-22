document.addEventListener('DOMContentLoaded', () => {
  // Compatibilidade da propriedade filter (blur)
  if (!CSS.supports('backdrop-filter', 'blur(2.5px)')) {
    document
      .querySelector('.modal-content')
      .classList.add('no-backdrop-support');
  }

  // Funções do Bootstrap 5
  const shareModal = new bootstrap.Modal(
    modal,
    (options = {
      backdrop: true,
      focus: true,
      keyboard: true,
    })
  );

  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  // Depurar a lista de tooltips do Bootstrap 5
  // console.log(tooltipTriggerList);
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Funções da página

  // Modal
  const btnCompartilhar = document.querySelector('#compartilhar');
  let tooltipCompartilhar = new bootstrap.Tooltip(btnCompartilhar);

  // Recriar o tooltip de compartilhar
  function reabilitarTooltipCompartilhar() {
    if (tooltipCompartilhar)
      tooltipCompartilhar = new bootstrap.Tooltip(btnCompartilhar);
  }

  btnCompartilhar.addEventListener('click', () => {
    shareModal.toggle();
    tooltipCompartilhar.dispose();
  });

  const closeBtn = document.querySelector('.btn-close');

  // Verificar se o cache já tem algum país ou estado
  const cacheDevPaisAnterior = localStorage.getItem('dev-pais');
  const cacheDevEstadoAnterior = localStorage.getItem('dev-estado');

  // [MODIFICAR] Aqui você coloca seus dados a serem compartilhados:
  const dev = {
    // Nome
    nome: 'Roberto Nóbrega Jr.',
    // Especialidade
    area: 'Desenvolvedor Front-end',
    // País (abreviatura)
    pais: 'br',
    // Estado (abreviatura, disponível apenas para br)
    estado: 'mg',
  };

  // Garantir letras maiúsculas
  dev.estado = dev.estado.toUpperCase();
  dev.pais = dev.pais.toLowerCase();

  // Armazena o seu estado em cache
  localStorage.setItem('dev-estado', dev.estado);
  localStorage.setItem('dev-pais', dev.pais);

  // [MODIFICAR] Aqui você muda seus links:
  // Caso não tiver, deixe null
  const links = {
    // Link do seu Whatsapp: (Atenção! Não é recomendado deixar o número pessoal)
    whatsapp: null,
    // Link do seu PIX:
    pix: 'https://tinyurl.com/qrcode-pix-roberto',
    // Link do seu Perfil no Github:
    github: 'https://github.com/devrenj',
    // Link do seu E-mail:
    email: 'mailto:devrenjbr@gmail.com',
    // Link do seu Perfil no Linkedin:
    linkedin: 'https://www.linkedin.com/in/devrenj',
    // Link do seu Perfil no Instagram:
    instagram: 'https://www.instagram.com/devrenjbr',
    // Link do seu perfil profissional:
    compartilhar: 'https://renj.dev.br',
  };

  // Carregar bandeira do país e do estado
  const bandeiraEstado = document.querySelector('#bandeira-estado');
  const bandeiraPais = document.querySelector('#bandeira-pais');

  // Consultas ao cache
  const cacheLinkBandeiraEstado = () => localStorage.getItem('bandeira-estado');
  const cacheLinkBandeiraPais = () => localStorage.getItem('bandeira-pais');
  const cacheDevEstado = () => localStorage.getItem('dev-estado');
  const cacheDevPais = () => localStorage.getItem('dev-pais');

  // Função para captar a bandeira do estado
  async function chamarAPIBandeira(uf) {
    if (!uf) return;
    try {
      const response = await fetch(
        'https://apis.codante.io/bandeiras-dos-estados'
      );
      const listaBandeiras = await response.json();
      const bandeira = listaBandeiras.find(
        (flag) => flag.uf === uf || flag.name === uf
      );
      return bandeira.flag_url;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Verifica se já existe e armazena em cache
  (async function verificarEstado() {
    if (!cacheLinkBandeiraEstado() || dev.estado !== cacheDevEstadoAnterior) {
      // Se mudar o estado ou não tiver link
      if (dev.pais === 'br') {
        const bandeira = await chamarAPIBandeira(dev.estado);
        localStorage.setItem('bandeira-estado', bandeira);
        inserirBandeiraEstado();
      } else {
        bandeiraEstado.style.display = 'none';
        console.error('Suporte para estados apenas para o país Brasil(BR)');
        return;
      }
    } else if (cacheLinkBandeiraEstado()) {
      if (dev.pais === 'br') {
        inserirBandeiraEstado();
      } else {
        bandeiraEstado.style.display = 'none';
        console.error('Suporte para estados apenas para o país Brasil(BR)');
        return;
      }
    } else {
      console.error('Não foi possível carregar a bandeira');
      return;
    }
  })();

  if (!cacheLinkBandeiraPais() || dev.pais !== cacheDevPaisAnterior) {
    localStorage.setItem(
      'bandeira-pais',
      `https://flagicons.lipis.dev/flags/4x3/${dev.pais}.svg`
    );
    inserirBandeiraPais();
  } else if (cacheLinkBandeiraPais()) {
    inserirBandeiraPais();
  } else {
    console.error('Não foi possível carregar a bandeira');
    return;
  }

  function inserirBandeiraEstado() {
    if (cacheLinkBandeiraEstado()) {
      bandeiraEstado.setAttribute('src', cacheLinkBandeiraEstado());
      bandeiraEstado.setAttribute('title', dev.estado.toUpperCase());
      bandeiraEstado.style.display = 'block';
    } else {
      console.error('Não foi possível renderizar a bandeira');
    }
  }

  function inserirBandeiraPais() {
    if (cacheLinkBandeiraPais()) {
      bandeiraPais.setAttribute('src', cacheLinkBandeiraPais());
      bandeiraPais.setAttribute('title', dev.pais.toUpperCase());
      bandeiraPais.style.display = 'block';
    } else {
      console.error('Não foi possível renderizar a bandeira');
    }
  }

  // Captar todos os botões de navegação e adicionar o evento de clique
  const botoesNav = document.querySelectorAll('.nav-btn');
  botoesNav.forEach((elemento) => {
    const plataforma = elemento.dataset.platform;
    const acao = elemento.dataset.action;
    if (links[plataforma] || links[acao]) {
      elemento.parentElement.classList.toggle('d-flex');
      elemento.parentElement.classList.toggle('d-none');
      elemento.addEventListener('click', () => {
        // Depurar elemento do evento de clique
        // console.log(elemento.id);
        if (plataforma in links) {
          abrirPagina(plataforma, links[plataforma], '_blank');
        } else if (elemento.id === 'compartilhar') {
          return;
        } else {
          alertar(
            `Link para ${plataforma} não encontrado!\nVerifique o arquivo "script.js"`,
            'Ok',
            'error'
          );
          console.error(
            `Link para ${plataforma} não encontrado!\nVerifique o arquivo "script.js"`
          );
        }
      });
    }
  });

  // Captar todos os botões do modal e adicionar o evento de clique
  const botoesModal = document.querySelectorAll('.modal-btn');
  botoesModal.forEach((elemento) => {
    elemento.addEventListener('click', () => {
      compartilhar(elemento.id);
    });
  });

  function compartilhar(plataforma) {
    let perfilUrl = links.compartilhar; // URL a ser compartilhada
    let textoMensagem = `${dev.nome || 'Dev'}\n${
      dev.area || 'Desenvolvedor' // Aqui fica o subtitulo da sua mensagem
    }\n\n`;
    let compartilharUrl;
    let textoParaCopiar;

    // Escolher o link a ser compartilhado
    switch (plataforma) {
      case 'whatsapp':
        compartilharUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          textoMensagem
        )}${encodeURIComponent(perfilUrl)}`;
        break;

      case 'facebook':
        compartilharUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          perfilUrl
        )}`;
        break;

      case 'telegram':
        compartilharUrl = `https://t.me/share/url?url=${encodeURIComponent(
          perfilUrl
        )}&text=${encodeURIComponent(textoMensagem)}`;
        break;

      // Antigo Twitter
      case 'x':
        compartilharUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          perfilUrl
        )}&text=${encodeURIComponent(textoMensagem)}`;
        break;

      case 'linkedin':
        compartilharUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          perfilUrl
        )}&title=${encodeURIComponent(textoMensagem)}`;
        break;

      case 'copiar':
        textoParaCopiar = `${textoMensagem}${perfilUrl}`;
        copiarTexto(textoParaCopiar);
        return;

      default:
        console.error(
          'Erro ao carregar o link. Verifique a função em src/script/script.js'
        );
        alertar('Erro ao compartilhar', 'Ok', 'error');
        return;
    }

    // Verificação se o link para compartilhar existe antes de abrir o modal
    if (compartilharUrl) {
      shareModal.toggle();
      abrirPagina(plataforma, compartilharUrl, '_blank');
    }

    function copiarTexto(textoParaCopiar) {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(textoParaCopiar)
          .then(() => {
            shareModal.toggle();
            alertar('Texto copiado!', false, 'success');
          })
          .catch((err) => {
            alertar('Erro ao copiar...', 'Ok', 'error');
            console.error('Erro ao copiar: ', err);
          });
      } else {
        alert('Seu navegador não suporta a API Clipboard.');
      }
    }
  }

  // Função de abrir página
  function abrirPagina(plataforma, url, target) {
    window.open(url, target);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        alertar(
          `${
            plataforma.charAt(0).toUpperCase() +
            plataforma.slice(1, plataforma.length)
          } aberto`,
          false,
          'success'
        );
      }
    });
  }

  // Quando o usuário clicar no 'X', feche o modal
  closeBtn.addEventListener('click', () => {
    shareModal.toggle();
    reabilitarTooltipCompartilhar();
  });
  modal.addEventListener('click', () => {
    shareModal.toggle();
    reabilitarTooltipCompartilhar();
  });

  // Funções do Sweet Alert - Cria alertas dependendo do evento disparado
  // texto: mostra uma mensagem, precisa ser uma "string"
  // msgBotao: define o texto do botão do alerta, precisa ter "string" || true || false
  // icone: define o icone do alerta, precisa ser "warning" || "error" || "success" || "info"
  // duracaoAlerta: define o tempo do alerta, configure com Segundos * Milissegundos
  const duracaoAlerta = 1.5 * 1000;
  function alertar(texto = 'Olá, Mundo!', msgBotao = false, icone = 'success') {
    // Se os parâmetros não estiverem preenchidos, usará estes valores acima como padrão
    swal(texto.toUpperCase(), {
      buttons: {
        text: msgBotao,
      },
      icon: icone,
      timer: msgBotao ? null : duracaoAlerta,
    });
  }

  // Funções de Depuração
  // document.onclick = (e) => {
  //   e.preventDefault()
  //   alert(e.target)
  //   // e.target.style.display = "none";
  // }

  // // Botão de teste
  // const teste = document.querySelector('#teste');
  // teste.onclick = () => {
  // // let vezes = 0;
  //   console.log('Teste pressionado', vezes);
  // // vezes++;
  //   alertar('Hello World!', 'Ok', 'success');
  // }
});
