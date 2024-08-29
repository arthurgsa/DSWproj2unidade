// Movimenta o banner das páginas
document.addEventListener('DOMContentLoaded', function() {
  const slideDoBanner = document.querySelector('.banner-slide');
  const totalSlides = document.querySelectorAll('.banner-slide a').length;
  let indiceAtual = 0;

  setInterval(function() {
      indiceAtual = (indiceAtual + 1) % totalSlides;
      slideDoBanner.style.transform = `translateX(-${indiceAtual * (100 / totalSlides)}%)`;
  }, 5000); // Muda a cada 5 segundos
});



// Array de objetos com informações dos produtos
const produtos = [
  {
      nome: 'Headset',
      imagem: 'imgs/headset.jpg',
      descricao: 'Excelente qualidade de som e conforto.',
      likes: 0,
      quantidade: 0 
  },
  {
      nome: 'Webcam',
      imagem: 'imgs/webcam.jpg',
      descricao: 'Imagens nítidas e em alta definição.',
      likes: 0,
      quantidade: 0 
  },
  {
      nome: 'Microfone',
      imagem: 'imgs/microfone.jpg',
      descricao: 'Som cristalino para suas gravações.',
      likes: 0,
      quantidade: 0 
  },
  {
      nome: 'Cadeira Gamer',
      imagem: 'imgs/cadeira-gamer.jpg',
      descricao: 'Conforto e estilo para suas sessões de jogos.',
      likes: 0,
      quantidade: 0
  },
  {
      nome: 'Teclado Mecânico',
      imagem: 'imgs/teclado-mecanico.jpg',
      descricao: 'Teclado mecânico com iluminação RGB.',
      likes: 0,
      quantidade: 0
  },
  {
      nome: 'Mouse Gamer',
      imagem: 'imgs/mouse-gamer.jpg',
      descricao: 'Mouse com iluminação personalizável.',
      likes: 0,
      quantidade: 0
  },
  {
      nome: 'Monitor 4K',
      imagem: 'imgs/monitor-4k.jpg',
      descricao: 'Monitor 4K com alta resolução.',
      likes: 0,
      quantidade: 0
  },
  {
      nome: 'Fone de Ouvido Bluetooth',
      imagem: 'imgs/fone-bluetooth.jpg',
      descricao: 'Fone Bluetooth com cancelamento de ruído.',
      likes: 0,
      quantidade: 0
  },
  {
      nome: 'Docking Station',
      imagem: 'imgs/docking-station.jpg',
      descricao: 'Docking para expandir e melhorar a produtividade.',
      likes: 0,
      quantidade: 0
  },
  {
      nome: 'Roteador Wi-Fi 6',
      imagem: 'imgs/roteador-wifi6.jpg',
      descricao: 'Roteador com alta velocidade para sua rede doméstica.',
      likes: 0,
      quantidade: 0
  },
  {
      nome: 'Impressora Multifuncional',
      imagem: 'imgs/impressora-multifuncional.jpg',
      descricao: 'Impressora multifuncional.',
      likes: 0,
      quantidade: 0
  },
  {
      nome: 'Caixa de Som Bluetooth',
      imagem: 'imgs/caixa-som-bluetooth.jpg',
      descricao: 'Caixa de som potente e resistente à água.',
      likes: 0,
      quantidade: 0
  }
];

// Função para exibir os produtos na página
function exibirProdutos() {
  const produtosGrid = document.querySelector('.produtos-grid');
  produtosGrid.innerHTML = produtos.map((produto, index) => {
    // Adiciona o emoji de estrela se o índice for 0, 1 ou 2
    const estrela = (index === 0 || index === 1 || index === 2) ? '⭐ ' : '';
    return `
      <div class="produto">
          <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem">
          <h3>${estrela}${produto.nome}</h3>
          <p>${produto.descricao}</p>
          <div class="votos">
              <button onclick="votar(${index}, 'like')">👍</button>
              <span id="likes-${index}">${produto.likes}</span>
              <span>🛒 ${produto.quantidade}</span> 
              <button class="button-comprar" onclick="mostrarDetalhes(${index})">Encomendar</button>
          </div>
      </div>
    `;
  }).join('');
}

// Função para salvar a posição do scroll e redirecionar para a página de compra
function mostrarDetalhes(index) {
  const produtoSelecionado = produtos[index];
  if (produtoSelecionado) {
      localStorage.setItem('produtoSelecionado', JSON.stringify(produtoSelecionado));
      localStorage.setItem('scrollPos', window.scrollY); // Salva a posição do scroll
      window.location.href = 'compra.html';
  }
}

// Função para carregar os detalhes do produto e restaurar a posição do scroll
function carregarDetalhesProduto() {
  const produtoSelecionado = JSON.parse(localStorage.getItem('produtoSelecionado'));
  if (produtoSelecionado) {
      const detalhesProdutoDiv = document.getElementById('detalhes-produto');
      detalhesProdutoDiv.innerHTML = `
          <div class="produto">
          <img src="${produtoSelecionado.imagem}" alt="${produtoSelecionado.nome}" class="produto-imagem-compra">
          <h3>${produtoSelecionado.nome}</h3>
          <p>${produtoSelecionado.descricao}</p>
          </div>
        `;
  } else {
      detalhesProdutoDiv.innerHTML = '<p>Nenhum produto selecionado.</p>';
  }

  // Restaurar a posição do scroll ao carregar a página de compra
  const scrollPos = localStorage.getItem('scrollPos');
  if (scrollPos) {
      window.scrollTo(0, parseInt(scrollPos, 10));
      localStorage.removeItem('scrollPos'); // Remove o item após usá-lo
  }
}

// votos na pagina produtos
function votar(index, tipo) {
  if (tipo === 'like') {
      produtos[index].likes += 1;
  } 
  salvarVotos();
  atualizarVotos(index);
}

function salvarVotos() {
  localStorage.setItem('produtosVotos', JSON.stringify(produtos));
}

function carregarVotos() {
  const votosSalvos = localStorage.getItem('produtosVotos');
  if (votosSalvos) {
      const produtosComVotos = JSON.parse(votosSalvos);
      produtos.forEach((produto, index) => {
          produto.likes = produtosComVotos[index].likes || 0;
      });
  }
}

// Função para atualizar os votos na interface
function atualizarVotos(index) {
  document.getElementById(`likes-${index}`).textContent = produtos[index].likes;
  
}



// Função para finalizar a compra
function finalizarCompra() {
  try {
    // Verifica se o formulário é válido antes de mostrar o alerta
    var form = document.getElementById('form-compra-form');
    if (form.checkValidity()) {
        // Recupera o produto selecionado do localStorage
        const produtoSelecionado = JSON.parse(localStorage.getItem('produtoSelecionado'));
        if (produtoSelecionado) {
            // Obtém a quantidade informada
            const quantidadeInput = document.getElementById('quantidade');
            const quantidade = parseInt(quantidadeInput.value, 10);

            // Verifica se a quantidade é um número positivo
            if (isNaN(quantidade) || quantidade <= 0) {
                alert('Por favor, insira uma quantidade válida.');
                return;
            }

            // Verifica se o e-mail está armazenado no localStorage
            const emails = JSON.parse(localStorage.getItem('emails')) || [];
            const emailUsuarioInput = document.getElementById('email');
            const emailUsuario = emailUsuarioInput.value.trim().toLowerCase();
            if (!emails.includes(emailUsuario)) {
                alert('E-mail não encontrado. Por favor, cadastre-se primeiro.');
                return;
            }

            // Encontra o índice do produto no array
            const index = produtos.findIndex(p => p.nome === produtoSelecionado.nome);
            if (index !== -1) {
                // Atualiza a quantidade
                produtos[index].quantidade += quantidade;
                salvarProdutos();
               
                alert('As informações foram enviadas. Aguarde o retorno do vendedor.');
                
                // Redirecionar para a página de produtos após a compra
                window.location.href = 'produtos.html';
            } else {
                throw new Error('Produto não encontrado no array.');
            }
        } else {
            throw new Error('Nenhum produto selecionado.');
        }
    } else {
        throw new Error('O formulário é inválido.');
    }
  } catch (error) {
    
    alert(error.message);
  }
}

// Função para salvar produtos no localStorage
function salvarProdutos() {
  localStorage.setItem('produtosComprados', JSON.stringify(produtos));
}

// Função para carregar produtos do localStorage
function carregarProdutos() {
  const comprasSalvas = localStorage.getItem('produtosComprados');
  if (comprasSalvas) {
      const produtosComVotos = JSON.parse(comprasSalvas);
      produtos.forEach((produto, index) => {
          produto.quantidade = produtosComVotos[index].quantidade || 0;
      });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Função para salvar o e-mail no localStorage
  function salvarEmail(email) {
      let emails = JSON.parse(localStorage.getItem('emails')) || [];
      
      if (emails.includes(email)) {
          alert('O e-mail já está cadastrado.');
      } else {
          emails.push(email);
          localStorage.setItem('emails', JSON.stringify(emails));
          alert('Cadastro realizado com sucesso!');
      }
  }

  // Adiciona um ouvinte de evento ao formulário de cadastro
  document.getElementById('form-cadastro').addEventListener('submit', function(event) {
      event.preventDefault(); // Impede o envio padrão do formulário

      const emailInput = document.getElementById('email');
      const email = emailInput.value.trim().toLowerCase();

      // Verifica se o e-mail não está vazio e salva no localStorage
      if (email) {
          salvarEmail(email);
          document.getElementById('form-cadastro').reset(); // Limpa o formulário
      }
  });
});


document.addEventListener('DOMContentLoaded', function(){
  carregarProdutos();
  carregarVotos();
  exibirProdutos();
});

document.addEventListener('DOMContentLoaded', carregarDetalhesProduto);





