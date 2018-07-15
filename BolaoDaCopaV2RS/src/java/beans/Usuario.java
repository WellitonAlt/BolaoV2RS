/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package beans;

import java.io.Serializable;
import java.util.Date;

public class Usuario implements Serializable {
    private int id;
    private String nome, email, senha, telefone;
    private Date dataDeNascimento;
    private int nPalpites;
    private int maxPalpites;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Date getDataDeNascimento() {
        return dataDeNascimento;
    }

    public void setDataDeNascimento(Date dataDeNascimento) {
        this.dataDeNascimento = dataDeNascimento;
    }

    public int getnPalpites() {
        return nPalpites;
    }

    public void setnPalpites(int nPalpites) {
        this.nPalpites = nPalpites;
    }

    public int getMaxPalpites() {
        return maxPalpites;
    }

    public void setMaxPalpites(int maxPalpites) {
        this.maxPalpites = maxPalpites;
    }
    
    
    
    
    
}
