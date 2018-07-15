/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package beans;

import java.io.Serializable;

public class Palpite implements Serializable {
    private int id;
    private String campeao;
    private String vice;
    private String terceiro;
    private String quarto;
    private Usuario palpiteiro;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCampeao() {
        return campeao;
    }

    public void setCampeao(String campeao) {
        this.campeao = campeao;
    }

    public String getVice() {
        return vice;
    }

    public void setVice(String vice) {
        this.vice = vice;
    }

    public Usuario getPalpiteiro() {
        return palpiteiro;
    }

    public void setPalpiteiro(Usuario palpiteiro) {
        this.palpiteiro = palpiteiro;
    }

    public String getTerceiro() {
        return terceiro;
    }

    public void setTerceiro(String terceiro) {
        this.terceiro = terceiro;
    }

    public String getQuarto() {
        return quarto;
    }

    public void setQuarto(String quarto) {
        this.quarto = quarto;
    }
    
    
    
}
