---
name: animate-video-pro
description: Animate Video Pro: narração ou texto com TTS em MP4 sincronizado, com módulos opcionais de visão e áudio (YuNet, MediaPipe, BEN2, SAM 2, Depth Anything, Demucs, PySceneDetect, CLAP) e renderizador Remotion ou Hyperframes. Usar para vídeos narrados de marcas, anúncios, educativos, institucionais, produtos e tutoriais.
---

# Animate Video Pro, framework de narração para vídeo

Versão Pro do Animate, portátil entre harnesses (Claude Code, Codex, Antigravity, Gemini CLI, Cursor, OpenCode, Copilot e outros que leem SKILL.md). Usa apenas shell, Python, Node e FFmpeg; não depende de ferramenta exclusiva de um agente.

## Recursos e SKILL_DIR

Resolver SKILL_DIR como a pasta deste SKILL.md. Scripts, referências e assets ficam em SKILL_DIR/scripts, SKILL_DIR/references e SKILL_DIR/assets. Se essas pastas tiverem apenas README.md de marcação, procurar uma instalação da skill narrate-to-animation (mesmas pastas) e usá-la como SKILL_DIR para os scripts. Se nenhuma tiver os arquivos, informar o bloqueio e indicar `npm run import-core` do repositório, em vez de improvisar os scripts.

## Preferências da instalação

Ler SKILL_DIR/animate.config.json antes de criar o projeto. Ele traz `video.formats` (proporção e dimensões), `video.primary`, `video.fps`, `renderer` e `modules.pack`, escolhidos pelo usuário no instalador.
- Sem pedido explícito de formato, renderizar em `video.primary`.
- Quando o usuário pedir "nos meus formatos", "todos os formatos" ou equivalente, renderizar uma versão por item de `video.formats`, recompondo o layout para cada proporção (não apenas cortar ou encolher).
- `renderer`: `remotion`, `hyperframes` ou `auto` (o agente decide por projeto).
- `modules.enabled` lista os módulos opcionais já autorizados para instalação sob demanda. Módulo fora da lista pode ser usado quando trouxer ganho real, avisando antes do download pesado.
- O pedido atual sempre prevalece sobre o arquivo. Se o arquivo não existir, usar 9:16 1080×1920, 30 fps, Remotion e pacote essencial.

## Entrada e saída

Receber áudio ou, quando o usuário pedir narração sintética, texto para TTS integrado. Aceitar também vídeo de apresentador (ver Módulos opcionais). Entregar MP4 pronto, H.264/AAC. Não exigir roteiro, transcrição, storyboard ou imagens do usuário. Aceitar 9:16, 1:1, 4:5, 3:4, 16:9, 4:3 ou dimensões pares explicitamente solicitadas. Usar o áudio como fonte de conteúdo; nunca adicionar alegações factuais ou comerciais sem base.

## Primeira configuração da marca

Ler references/brand-onboarding.md ao receber marca nova ou pedido de identidade visual. Fazer uma pergunta por vez: receber a logo primeiro quando ainda ausente, analisar cores e estilo, verificar se existe design system e aproveitar referências. Se não houver, propor até três paletas e uma combinação de fontes; distinguir fonte confirmada de aproximação visual. Se o usuário pedir design system automático, selecionar e salvar a proposta como decisão delegada, sem repetir confirmação. Usar scripts/brand_setup.py como auxílio de cores e perfil, sem substituir a inspeção visual.

Salvar o perfil com logo institucional original e do evento quando necessária, tokens, fontes, motion, legendas, trilha, voz, formatos e decisões. Usar scripts/framework.py register-brand para registrar no runtime e conservar uma cópia portátil profile/ no projeto. Reutilizar perfil aprovado/delegado em execuções seguintes; pedir apenas o áudio se ainda ausente. Quando o áudio já estiver disponível, iniciar o fluxo normal sem repetir a entrevista. Recuperar perfil salvo antes de solicitar novamente as configurações.

## Fluxo padrão da produção

Na primeira configuração: pedir logo da empresa e do evento se aplicável; aproveitar ou propor design system; resolver fonte sem identificação falsa; salvar o perfil quando aprovado ou delegado; então pedir o áudio. Fazer uma pergunta por vez e reutilizar informações já fornecidas.

Com áudio recebido: preservar original → analisar voz → encurtar silêncios excessivos com fades sem cortar sílabas → tratar discretamente e aplicar ganho inicial 1,1 com headroom → transcrever/alinhar palavras → perguntar qual música de fundo usar se ainda não definida → buscar referências adequadas ao que é narrado → montar cenas, imagens e traços por contexto → sincronizar legendas e dizeres → mixar trilha/efeitos → renderizar e revisar MP4. Preferir WhisperX quando disponível; a alternativa CPU faster-whisper com word timestamps continua documentada para ambientes sem o alinhador. Nunca chamar o backend alternativo de WhisperX.

Configurações transversais: música perto de 20% durante fala, introdução sugerida 0,7 s, voz com ganho inicial 1,1, dois segundos finais, sem fade musical automático de três segundos, efeitos discretos, denoise desligado por padrão, zoom pontual e variedade real de imagens/fundos. Ajustar conforme perfil e pedido. Decisões específicas de uma marca ficam isoladas no perfil dela.

## Configurar marca e finalidade

Ler references/framework.md antes de iniciar um projeto. Resolver marca, perfil versionado e finalidade (promotional, educational, institutional, product ou tutorial). Usar scripts/framework.py para cadastrar marcas e criar projetos com snapshots. Aplicar pedido atual sobre defaults. Manter motor compartilhado e configurações isoladas por empresa; perfil neutro nunca contém assets de outra marca.

## TTS integrado

Quando o usuário fornecer texto e solicitar voz sintética sem API, ler references/tts.md e executar scripts/tts.py. Manter áudio enviado pelo usuário como entrada padrão quando disponível. Em teste de narrador, gerar três amostras comparáveis antes de definir uma voz padrão, sem música e sem efeitos. Não tratar instalação do motor como teste de voz concluído.

## Preparação do ambiente

Quando o usuário pedir produção completa, preparar o ambiente disponível em vez de apenas listar dependências. Ler references/chat-execution.md e executar `python SKILL_DIR/scripts/bootstrap.py WORK/runtime` na primeira preparação. O comando cria o runtime isolado, instala pacotes e ferramentas faltantes e testa a geração real de um MP4. Usar scripts/run_runtime.py nas etapas seguintes. Reutilizar o ambiente validado em vez de reinstalar a cada áudio. Não exigir login ou chave de API para o pipeline local.

Não presumir bloqueio por falta de binário. Tentar a preparação permitida e relatar o erro concreto somente se a tentativa falhar. Não declarar o sistema pronto se bootstrap-report.json não indicar ready. Se o harness não oferece execução de comandos ou acesso aos arquivos, explicar precisamente o recurso ausente.

## Executar

Criar diretório de trabalho exclusivo fora da skill. Preservar o áudio original. Executar comandos com argumentos seguros, sem interpolar transcrições no shell.

1. Verificar `ffmpeg`, `ffprobe`, Python 3.10+, Node 20+ (22+ se usar Hyperframes) e npm. Usar scripts/prepare_runtime.py para criar o ambiente de áudio/transcrição e dependências de render. Para WhisperX usar ambiente virtual dedicado. Consultar references/runtime.md.
2. Executar `python SKILL_DIR/scripts/pipeline.py prepare AUDIO WORK/processed`. Ouvir o áudio editado. O limiar -38 dB é ponto inicial. Não cortar sílabas, respirações por padrão, pausas expressivas, negações ou conteúdo. Preservar edit.json como mapa de cortes. Se a detecção cortar fala baixa, refazer com limiar menor ou manter todo o áudio.
3. Executar `python SKILL_DIR/scripts/transcribe_portable.py WORK/processed --model small` (CPU, tempos reais por palavra) ou `python SKILL_DIR/scripts/pipeline.py transcribe WORK/processed --model small` (WhisperX). Não substituir fala real por timestamps inventados; sem transcritor com alinhamento real, informar bloqueio.
4. Executar `python SKILL_DIR/scripts/framework.py project WORK/processed WORK/project --brand MARCA --preset FINALIDADE --ratio PROPORÇÃO`, com a proporção resolvida pelas Preferências da instalação. Para resolução personalizada editar width/height pares em story.json.
5. Ler transcript.json do áudio EDITADO. Criar storyboard interno a partir dos tempos reais das frases. Reescrever story.json: demo=false, duração real, cenas contíguas, títulos curtos, legendas fiéis e desenhos adequados. A base oferece cenas title, image, list, metric, draw e closing, com cues por elemento.
6. Sincronizar cada desenho, dizer ou tópico à palavra/frase correspondente. Revelar listas item a item no momento da fala. Seguir references/motion-direction.md. Produzir legendas por frase, sem inventar palavras. Conferir números, nomes e termos ouvindo o original.
7. Adaptar composição à proporção: horizontais redistribuem ilustração e texto lado a lado, quadrados reduzem espaços, retratos 4:5/3:4 empilham com respiro. Preservar a logo original; não redesenhar.
8. Executar `python SKILL_DIR/scripts/validate_story.py WORK/project --production`; `npm install`; `npm run render` (ou o render do Hyperframes quando escolhido). Conferir licença atual do Remotion conforme uso comercial antes de distribuir a terceiros.
9. Inspecionar frames do começo, meio, fim e trocas de cena; ouvir os cortes; verificar tela vazia, texto cortado, cliques e legendas fora de sincronia. Verificar dimensões e codecs com ffprobe. Renderizar novamente após correções.
10. Entregar o(s) MP4. Informar exatamente o que foi testado e qualquer bloqueio restante. Não chamar teste com tons sintéticos de validação de voz real.

## Base técnica

Ler references/technical-stack.md para os papéis de WhisperX, FFmpeg, Remotion e @remotion/paths. Animações de traço usam SVG paths progressivos com frames e cues reais, sem simular traço com um PNG revelado.

## Módulos opcionais de visão e áudio

O núcleo continua WhisperX + FFmpeg + renderizador. Os módulos abaixo são opcionais: acionar quando o material pedir ou quando houver ganho real, nunca por exibição. Instalar sob demanda no runtime isolado (venv dedicado por módulo pesado), registrar em bootstrap-report.json o que foi instalado e em project/tools.json o que foi usado, com versão e licença. Se um módulo falhar ou não houver GPU suficiente, seguir com o fallback indicado e informar; nunca travar a produção por módulo opcional.

- **Vídeo de apresentador recebido**: extrair áudio com FFmpeg e seguir o fluxo normal; detectar rosto para zoom e reenquadramento.
- **YuNet (OpenCV FaceDetectorYN)**: zooms centralizados no rosto e conversão 16:9 → 9:16/1:1 sem cortar a cabeça. Suavizar a trajetória do recorte. Fallback: MediaPipe Face Detection.
- **MediaPipe (Face 478, Hands 21, Pose 33 pontos)**: ancorar grafismos ao corpo, traços que seguem o dedo, contador ao contar nos dedos. Usar só quando o gesto existe; exportar pontos por frame em JSON.
- **BEN2 (PramaLLC, base MIT)**: rotoscopia pessoa/fundo para texto atrás do apresentador, contorno ou fundo escurecido. Alpha em PNG ou ProRes 4444, composição em três camadas. Revisar bordas de cabelo e mãos.
- **SAM 2**: recortar e rastrear objeto que não é pessoa (produto, prato, embalagem). Prompt por ponto/caixa no primeiro frame.
- **Depth Anything (V2)**: parallax 2.5D em foto estática com 2–4 camadas. Usar Small por padrão; conferir licença dos checkpoints maiores antes de uso comercial.
- **Demucs**: isolar a voz quando o áudio tiver música/ruído misturado; extrair stems. Manter original se a separação degradar a voz.
- **PySceneDetect**: em vídeo com cortes, detectar cenas para alinhar transições e evitar zoom atravessando corte.
- **CLAP (LAION)**: escolher efeitos sonoros de uma biblioteca local por descrição textual. Manter efeitos discretos.
- **Recados na gravação**: usar timestamps do WhisperX para detectar palavras-chave combinadas ("corta", "de novo", "marca aqui") e repetições; propor cortes no edit.json e ouvir antes de aplicar.

## Renderizador: Remotion ou Hyperframes

Remotion é o padrão do scaffold. Hyperframes (HeyGen, Apache 2.0, Node 22+ e FFmpeg) é alternativa: HTML/CSS/GSAP renderizado quadro a quadro com `npx hyperframes render`. Preferir Hyperframes quando a licença do Remotion impedir o uso comercial do cliente ou quando a animação já estiver em HTML/GSAP. Em ambos, renderizar camadas com alpha quando houver rotoscopia e compor no FFmpeg. Registrar a escolha em story.json.

## Qualidade visual e dinamismo

Ler references/motion-direction.md antes de planejar as cenas. A saída deve ter direção de arte, variação de composição, animação em camadas e movimentos ligados à fala. Não usar slide fixo com contorno de ícones rudimentares como resultado final. Priorizar correspondência semântica entre fala e imagem, com microsequências de causa e resultado. Planejar zoom-in pontual e dois ou três momentos de maior ênfase por minuto.

## Fotografias de produto e variedade

Ler references/product-photography.md ao planejar cenas de comida ou produto. Usar foto real ou imagem gerada fotorrealista; nunca pictograma para comida. Priorizar fotos do cliente, depois geração e depois banco com licença verificada. Registrar origem/licença em photos/CREDITOS.md. Evitar a mesma imagem principal em cenas consecutivas.

## Duração e aceleração autorizada

Usar a duração solicitada ou a meta do perfil/preset. Quando houver limite ativo, medir a duração real com introdução e encerramento; se ultrapassar, informar o fator (duração total / limite) e perguntar antes de acelerar. Quando autorizado, acelerar juntos imagem, voz, música, efeitos e legendas com setpts e atempo encadeado, sem alterar sample rate. Conferir com ffprobe e ouvir a inteligibilidade. Manter o master original e registrar o fator.

## Voz, efeitos e música

Ler references/sound-design.md antes de tratar o áudio ou finalizar. Efeitos suaves só nos movimentos importantes. Consultar a preferência de música quando ainda não confirmada. Música em cerca de 20% durante a fala, ganho de voz inicial 1,1 com headroom, dois segundos após a voz. Tratar estalos de forma conservadora e manter denoise desligado salvo necessidade demonstrada. Usar scripts/sound_design.py e validar picos e emendas na codificação final.

## Teste técnico

`python SKILL_DIR/scripts/test_pipeline.py` e `python SKILL_DIR/scripts/pipeline.py demo WORK/demo` geram tons e uma pausa conhecida para exercitar cortes e renderização. Nunca entregar esse teste como vídeo final.
