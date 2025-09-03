"use client";

import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  MoreHorizontal,
  Search,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Livro } from "@/types";
import { livroService } from "@/services/api";

export default function DataTableLivros() {
  const [filteredLivros, setFilteredLivros] = useState<Livro[]>([]);
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadLivros();
  }, []);

  useEffect(() => {
    const filtered = livros.filter(
      (livro) =>
        livro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        livro.isbn.includes(searchTerm) ||
        livro.editora?.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLivros(filtered);
  }, [livros, searchTerm]);

  const loadLivros = async () => {
    try {
      setLoading(true);
      const response = await livroService.getAll();
      setLivros(response.data);
    } catch (error) {
      console.error("Erro ao carregar livros:", error);
      // Dados mockados para demonstração
      setLivros([
        {
          livroID: 1,
          titulo: "O Senhor dos Anéis",
          editoraID: 1,
          isbn: "9788533613379",
          anoPublicacao: 1954,
          edicao: "1ª Edição",
          numeroPaginas: 1216,
          sinopse: "A história de Frodo e sua jornada para destruir o Um Anel.",
          editora: {
            editoraID: 1,
            nome: "Martins Fontes",
            contato: "contato@martinsfontes.com.br",
          },
          autores: [
            {
              autorID: 1,
              nome: "J.R.R.",
              sobrenome: "Tolkien",
              nacionalidade: "Inglês",
            },
          ],
          generos: [{ generoID: 1, nome: "Fantasia" }],
        },
        {
          livroID: 2,
          titulo: "Harry Potter e a Pedra Filosofal",
          editoraID: 2,
          isbn: "9788532511010",
          anoPublicacao: 1997,
          edicao: "1ª Edição",
          numeroPaginas: 264,
          sinopse: "A história de um jovem bruxo e sua jornada em Hogwarts.",
          editora: {
            editoraID: 2,
            nome: "Rocco",
            contato: "contato@rocco.com.br",
          },
          autores: [
            {
              autorID: 2,
              nome: "J.K.",
              sobrenome: "Rowling",
              nacionalidade: "Inglesa",
            },
          ],
          generos: [{ generoID: 1, nome: "Fantasia" }],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4lg:gap-6 lg:px-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Acervo de Livros
          </h1>
          <p className="text-muted-foreground">
            Gerencie, adicione e visualize os livros da biblioteca.
          </p>
        </div>
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por título, ISBN ou editora..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-full md:w-80"
                />
              </div>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Novo Livro
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead className="hidden md:table-cell">ISBN</TableHead>
                  <TableHead>Editora</TableHead>
                  <TableHead className="hidden sm:table-cell">Ano</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLivros.length > 0 ? (
                  filteredLivros.map((livro) => (
                    <TableRow key={livro.livroID}>
                      <TableCell>
                        <div className="font-medium">{livro.titulo}</div>
                        <div className="text-sm text-muted-foreground">
                          {livro.edicao}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell font-mono text-sm">
                        {livro.isbn}
                      </TableCell>
                      <TableCell>{livro.editora?.nome}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {livro.anoPublicacao}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" /> Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" /> Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Nenhum livro encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
