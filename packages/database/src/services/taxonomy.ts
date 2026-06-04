import { prisma } from "../index";

export const TaxonomyService = {
  // --- DISCIPLINAS ---
  async getDisciplinas() {
    return await prisma.disciplina.findMany({
      orderBy: { nome: 'asc' },
      include: {
        _count: { select: { questoes: true } },
        assuntos: {
          include: {
            _count: { select: { questoes: true } },
            topicos: {
              include: { 
                _count: { select: { questoes: true } },
                subtopicos: {
                  include: { _count: { select: { questoes: true } } }
                }
              },
              orderBy: { nome: "asc" },
            }
          },
          orderBy: { nome: "asc" },
        }
      }
    });
  },

  async createDisciplina(data: { nome: string; sigla: string }) {
    return await prisma.disciplina.create({
      data: {
        nome: data.nome,
        sigla: data.sigla.toUpperCase(),
        ativo: true
      }
    });
  },

  async updateDisciplina(id: string, data: { nome?: string; code?: string; ativo?: boolean }) {
    return await prisma.disciplina.update({
      where: { id },
      data
    });
  },

  async deleteDisciplina(id: string) {
    return await prisma.disciplina.delete({ where: { id } });
  },

  // --- ASSUNTOS ---
  async createAssunto(data: { disciplinaId: string; nome: string }) {
    return await prisma.assunto.create({
      data: { ...data, ativo: true }
    });
  },

  async updateAssunto(id: string, data: { nome?: string; ativo?: boolean }) {
    return await prisma.assunto.update({
      where: { id },
      data
    });
  },

  async deleteAssunto(id: string) {
    return await prisma.assunto.delete({ where: { id } });
  },

  // --- TÓPICOS ---
  async createTopico(data: { assuntoId: string; nome: string }) {
    return await prisma.topico.create({
      data: { ...data, ativo: true }
    });
  },

  async updateTopico(id: string, data: { nome?: string; ativo?: boolean }) {
    return await prisma.topico.update({
      where: { id },
      data
    });
  },

  async deleteTopico(id: string) {
    return await prisma.topico.delete({ where: { id } });
  },

  // --- SUBTÓPICOS ---
  async createSubtopico(data: { topicoId: string; nome: string }) {
    return await prisma.subtopico.create({
      data: { ...data, ativo: true }
    });
  },

  async updateSubtopico(id: string, data: { nome?: string; ativo?: boolean }) {
    return await prisma.subtopico.update({
      where: { id },
      data
    });
  },

  async deleteSubtopico(id: string) {
    return await prisma.subtopico.delete({ where: { id } });
  },

  // --- NÍVEIS EDUCACIONAIS ---
  async getNiveisEducacionais() {
    return await prisma.nivelEducacional.findMany({
      orderBy: { ordem: 'asc' },
      include: { _count: { select: { questoes: true } } }
    });
  },

  async createNivelEducacional(data: { nome: string; slug?: string; descricao?: string; ordem?: number }) {
    const slug = data.slug || data.nome.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    return await prisma.nivelEducacional.create({
      data: { 
        nome: data.nome, 
        slug,
        descricao: data.descricao,
        ordem: data.ordem || 0
      }
    });
  },

  async updateNivelEducacional(id: string, data: { nome?: string; slug?: string; descricao?: string; ordem?: number; ativo?: boolean }) {
    if (data.nome && !data.slug) {
      data.slug = data.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
    }
    return await prisma.nivelEducacional.update({
      where: { id },
      data
    });
  },

  async deleteNivelEducacional(id: string) {
    return await prisma.nivelEducacional.delete({ where: { id } });
  },

  // --- DIFICULDADES ---
  async getDificuldades() {
    return await prisma.dificuldade.findMany({
      orderBy: { ordem: 'asc' },
      include: { _count: { select: { questoes: true } } }
    });
  },

  async createDificuldade(data: { 
    nome: string; 
    slug?: string; 
    descricao?: string; 
    peso?: number; 
    ordem?: number; 
    cor?: string 
  }) {
    const slug = data.slug || data.nome.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    return await prisma.dificuldade.create({
      data: { 
        nome: data.nome, 
        slug,
        descricao: data.descricao,
        peso: data.peso || 1,
        ordem: data.ordem || 0,
        cor: data.cor
      }
    });
  },

  async updateDificuldade(id: string, data: { nome?: string; slug?: string; peso?: number; ordem?: number; cor?: string; ativo?: boolean }) {
    if (data.nome && !data.slug) {
      data.slug = data.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
    }
    return await prisma.dificuldade.update({
      where: { id },
      data
    });
  },

  async deleteDificuldade(id: string) {
    return await prisma.dificuldade.delete({ where: { id } });
  },

  // --- HIERARQUIA ---
  async moveItem(id: string, newParentId: string | null, nivel: string) {
    const parentFieldMap: Record<string, string> = {
      carreira: "parentId",
      instituicao: "parentId",
      orgao: "parentId",
      concurso: "carreiraId",
      cargo: "concursoId",
      assunto: "disciplinaId",
      topico: "assuntoId",
      subtopico: "topicoId"
    };

    const modelMap: Record<string, any> = {
      carreira: prisma.carreira,
      instituicao: prisma.carreira,
      orgao: prisma.carreira,
      concurso: prisma.concurso,
      cargo: prisma.cargo,
      assunto: prisma.assunto,
      topico: prisma.topico,
      subtopico: prisma.subtopico
    };

    const field = parentFieldMap[nivel];
    const model = modelMap[nivel];

    if (!field || !model) throw new Error(`Nível ${nivel} não suportado para movimentação`);

    return await model.update({
      where: { id },
      data: { [field]: newParentId }
    });
  },

  // --- BANCAS ---
  async getBancas() {
    return await prisma.banca.findMany({ 
      orderBy: [
        { nome: 'asc' },
        { sigla: 'asc' }
      ],
      include: { _count: { select: { questoes: true } } }
    });
  },

  async createBanca(data: { 
    nome: string; 
    sigla?: string; 
    slug?: string; 
    cor?: string; 
    ordem?: number;
    logoUrl?: string;
    descricao?: string;
  }) {
    const slug = data.slug || data.nome.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    return await prisma.banca.create({ 
      data: { 
        ...data, 
        sigla: data.sigla?.toUpperCase(),
        slug,
        ativo: true 
      } 
    });
  },

  async updateBanca(id: string, data: { nome?: string; sigla?: string; ativo?: boolean; cor?: string; ordem?: number }) {
    return await prisma.banca.update({ 
      where: { id }, 
      data: {
        ...data,
        sigla: data.sigla?.toUpperCase()
      }
    });
  },

  async deleteBanca(id: string) {
    return await prisma.banca.delete({ where: { id } });
  },

  // --- CONCURSOS ---
  async getConcursos() {
    return await prisma.concurso.findMany({ 
      orderBy: [{ ano: "desc" }, { nome: "asc" }],
      include: { 
        carreira: true, 
        cargos: { orderBy: { nome: "asc" } },
        _count: { select: { questoes: true } } 
      }
    });
  },

  async createConcurso(data: { nome: string; ano?: number; cargo?: string; carreiraId?: string }) {
    return await prisma.concurso.create({ 
      data: { 
        nome: data.nome,
        ano: data.ano,
        carreiraId: data.carreiraId,
        ativo: true,
        cargos: data.cargo ? {
          create: {
            nome: data.cargo,
            ativo: true
          }
        } : undefined
      } 
    });
  },

  async updateConcurso(id: string, data: { nome?: string; ano?: number; cargo?: string; ativo?: boolean; imagemUrl?: string }) {
    // 1. Atualiza os dados básicos do concurso
    const concurso = await prisma.concurso.update({ 
      where: { id }, 
      data: {
        nome: data.nome,
        ano: data.ano,
        ativo: data.ativo,
        imagemUrl: data.imagemUrl
      },
      include: { cargos: true }
    });

    // 2. Se houver um nome de cargo, atualiza o primeiro ou cria um novo
    if (data.cargo) {
      const firstCargo = concurso.cargos[0];

      if (firstCargo) {
        await prisma.cargo.update({
          where: { id: firstCargo.id },
          data: { nome: data.cargo }
        });
      } else {
        await prisma.cargo.create({
          data: {
            nome: data.cargo,
            concursoId: id,
            ativo: true
          }
        });
      }
    }

    return concurso;
  },

  async deleteConcurso(id: string) {
    return await prisma.concurso.delete({ where: { id } });
  },

  // --- CARREIRAS (HIERARQUIA) ---
  async getCarreiras() {
    return await prisma.carreira.findMany({
      where: { parentId: null },
      orderBy: { nome: "asc" },
      include: {
        _count: { select: { questoes: true } },
        children: {
          orderBy: { nome: "asc" },
          include: {
            _count: { select: { questoes: true } },
            children: {
              orderBy: { nome: "asc" },
              include: {
                _count: { select: { questoes: true } },
                concursos: {
                  orderBy: { ano: "desc" },
                  include: { 
                    cargos: { orderBy: { nome: "asc" } },
                    _count: { select: { questoes: true } } 
                  }
                }
              }
            }
          }
        }
      }
    });
  },

  async createCarreira(data: { nome: string; parentId?: string | null }) {
    return await prisma.carreira.create({ 
      data: { ...data, ativo: true } 
    });
  },

  async updateCarreira(id: string, data: { nome?: string; ativo?: boolean }) {
    return await prisma.carreira.update({ 
      where: { id }, 
      data: {
        nome: data.nome,
        ativo: data.ativo
      } 
    });
  },

  async deleteCarreira(id: string) {
    return await prisma.carreira.delete({ where: { id } });
  },

  async createConcursoVinculado(carreiraId: string | null | undefined, data: { nome: string; cargo?: string; ano: number; imagemUrl?: string }) {
    return await prisma.concurso.create({
      data: {
        nome: data.nome,
        ano: data.ano,
        imagemUrl: data.imagemUrl || null,
        carreiraId: carreiraId,
        ativo: true,
        ...(data.cargo ? {
          cargos: {
            create: {
              nome: data.cargo,
              ativo: true
            }
          }
        } : {})
      }
    });
  },

  async createCargoVinculado(concursoId: string, nome: string) {
    return await prisma.cargo.create({
      data: {
        nome,
        concursoId,
        ativo: true
      }
    });
  },

  async updateCargo(id: string, data: { nome?: string; ativo?: boolean }) {
    return await prisma.cargo.update({
      where: { id },
      data
    });
  },

  async deleteCargo(id: string) {
    return await prisma.cargo.delete({ where: { id } });
  },

  async deleteHierarchyItem(id: string, nivel: string) {
    if (nivel === "carreira" || nivel === "instituicao" || nivel === "orgao") return await this.deleteCarreira(id);
    if (nivel === "concurso") return await this.deleteConcurso(id);
    if (nivel === "cargo") return await this.deleteCargo(id);
    throw new Error(`Nível ${nivel} não suportado para deleção`);
  },

  // --- TIPOS DE QUESTÃO ---
  async getTiposQuestao() {
    return await prisma.tipoQuestao.findMany({
      orderBy: { ordem: 'asc' },
      include: { _count: { select: { questoes: true } } }
    });
  },

  async createTipoQuestao(data: { 
    nome: string; 
    slug?: string; 
    descricao?: string; 
    ordem?: number;
    formato?: string;
    quantidadeAlternativas?: number;
  }) {
    const slug = data.slug || data.nome.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    return await prisma.tipoQuestao.create({
      data: {
        nome: data.nome,
        slug,
        descricao: data.descricao,
        ordem: data.ordem || 0,
        formato: data.formato || "ALTERNATIVAS",
        quantidadeAlternativas: data.quantidadeAlternativas !== undefined ? data.quantidadeAlternativas : 5
      }
    });
  },

  async updateTipoQuestao(id: string, data: { 
    nome?: string; 
    slug?: string; 
    descricao?: string; 
    ordem?: number; 
    ativo?: boolean;
    formato?: string;
    quantidadeAlternativas?: number;
  }) {
    if (data.nome && !data.slug) {
      data.slug = data.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
    }
    return await prisma.tipoQuestao.update({
      where: { id },
      data
    });
  },

  async deleteTipoQuestao(id: string) {
    return await prisma.tipoQuestao.delete({ where: { id } });
  }
};
