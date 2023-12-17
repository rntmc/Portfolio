import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {Header} from "../../components/Header";
import {Input} from "../../components/Input";
import {TextArea} from "../../components/TextArea";
import {NoteItem} from "../../components/NoteItem";
import {Section} from "../../components/Section";
import {Button} from "../../components/Button";
import {ButtonText} from "../../components/ButtonText";

import {api} from "../../services/api"

import {Container, Form} from "./styles";

export function New() {
  const[title, setTitle] = useState("");
  const[description, setDescription] = useState("");


  const[links, setLinks] = useState([]);
  const[newLink, setNewLink] = useState("");

  const[tags, setTags] = useState([]);
  const[newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleBack(){
    navigate(-1);
  }

  function handleAddLink(){
    setLinks(prevState => [...prevState, newLink]); //queremos manter os antigos links + novoLink
    setNewLink("");
  }

  function handleRemoveLink(deleted){
    setLinks(prevState => prevState.filter(link => link != deleted));
  }

  function handleAddTag(){
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deleted){
    setTags(prevState => prevState.filter(tag => tag !== deleted));
  }

  async function handleNewNote(){
    if(!title){
      return alert("Digite o titulo da nota");
    }

    if(newLink){
      return alert("Voce deixou um link no campo para adicionar, mas nao clicou em adicionar. Clique em adicionar ou deixe o campo vazio");
    }

    if(newTag){
      return alert("Voce deixou uma tag no campo para adicionar, mas nao clicou em adicionar. Clique em adicionar ou deixe o campo vazio");
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    })

    alert("Nota criada com sucesso!");
    navigate(-1);
  }

  return(
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText 
              title="Voltar" 
              onClick={handleBack}
              />
          </header>

          <Input 
          placeholder="Titulo"
          onChange ={e => setTitle(e.target.value)}
          />

          <TextArea 
          placeholder="Observacoes"
          onChange ={e => setDescription(e.target.value)}
          />      

          <Section title="Links uteis">
            {
              links.map((link, index) => (
                <NoteItem 
                  key={String(index)}
                  value={link}
                  onClick={() => handleRemoveLink(link)}
                />
              ))
            }
                <NoteItem 
                  isNew 
                  placeholder="Novo link"
                  value={newLink}
                  onChange={e=> setNewLink(e.target.value)}
                  onClick={handleAddLink}
                />
              </Section>

          <Section title = "marcadores">
            <div className = "tags">
              {
                tags.map((tag, index) => (
                <NoteItem 
                key={String(index)}
                value={tag}
                onClick={() => handleRemoveTag(tag)}
              />
                ))
              }
            <NoteItem 
            isNew 
            placeholder="Nova tag"
            onChange = {e => setNewTag(e.target.value)}
            value={newTag}
            onClick={handleAddTag}
            />
            </div>            
          </Section>

          <Button 
          title="salvar" 
          onClick={handleNewNote}
          />
        
        </Form>
      </main>
    </Container>
  )
}