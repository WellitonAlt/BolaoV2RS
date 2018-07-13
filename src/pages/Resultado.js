
import React from 'react';
import NovoResultadoMaquinaEstados from './ResultadoMaquinaEstados';
import axios from 'axios';

import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Dropdown } from 'primereact/components/dropdown/Dropdown';

class Resultado extends React.Component {
    constructor() {
        super();
        this.state = {
            campeao: '',
            vice: '',
            terceiro: '',
            quarto: '',
            confirmarSenha: '',
            ganhadores: null,
            estado: NovoResultadoMaquinaEstados.inicio(),
            mensagem: 'Selecione os times para achar o ganhador do balão',
            mensagemClassName: 'alert alert-info',
            usuarioEncontrado: null,
            mensagensValidacao: {
                campeao: '',
                vice: '',
                terceiro: '',
                quarto: '',
            },
            //Controla as bordas dos inputs
            bordaValidacao: {
                campeao: 'form-control',
                vice: 'form-control',
                terceiro: 'form-control',
                quarto: 'form-control',
            },

        };
    }

    async componentDidMount() {
        const responseSelecoes = await fetch('http://localhost:8080/BolaoDaCopaV2RS/webresources/selecao');
        var contentTypeSelecoes = responseSelecoes.headers.get("content-type");
        if (contentTypeSelecoes && contentTypeSelecoes.includes("application/json")) {
            const selecoesJson = await responseSelecoes.json();
            var combo = [];
            for (var i = 0; i < selecoesJson.length; i++) {
                combo.push(
                <option key={selecoesJson[i].id} value={selecoesJson[i].nome}>
                 {selecoesJson[i].nome} 
                 </option>);
            }
            this.setState({ selecoes: combo })
        }


        var source = 'http://localhost:8080/BolaoDaCopaV2RS/webresources/palpite/ganhadores?campeao='+this.state.campeao+'&vice='+this.state.vice+'&terceiro='+this.state.terceiro+'&quarto='+this.state.quarto;

            const responseGanhadores = await fetch(source);
            var contentTypeGanhadores = responseGanhadores.headers.get("content-type");
            if (contentTypeGanhadores && contentTypeGanhadores.includes("application/json")) {
                const ganhadoresJson = await responseGanhadores.json();
                this.setState({ ganhadores: ganhadoresJson });
            }
      }

    render() {

        return (
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h4>Resultado</h4>
                    <form className="form-horizontal" name="formPalpite">
                        <div className={this.state.mensagemClassName}>
                            {this.state.mensagem}
                        </div>
                        <div className='form-group'>
                            <label className="col-sm-2 control-label" htmlFor="campeao">Campeão</label>
                            <div className="col-sm-4">
                                    <select 
                                        className={this.state.bordaValidacao['campeao']}
                                        name="campeao"
                                        disabled={this.state.estado.campoTimesDesabilitado}
                                        value={this.state.campeao}
                                        onChange={(event) => this.handleUserInput(event)}>
                                        <option value='' selected> Selecione um Campeao </option>
                                        {this.state.selecoes}
                                    </select>
                                <span className="text text-danger">{this.state.mensagensValidacao['campeao']}</span>     
                            </div>
                            <label className="col-sm-2 control-label" htmlFor="vice">Vice</label>
                            <div className="col-sm-4">
                                    <select 
                                        className={this.state.bordaValidacao['vice']}
                                        name="vice"
                                        disabled={this.state.estado.campoTimesDesabilitado}
                                        value={this.state.vice}
                                        onChange={(event) => this.handleUserInput(event)}>
                                        <option value=''selected> Selecione um Vice </option>
                                        {this.state.selecoes}
                                    </select>
                                <span className="text text-danger">{this.state.mensagensValidacao['vice']}</span>
                            </div>
                            <label className="col-sm-2 control-label" htmlFor="terceiro">Terceiro</label>
                            <div className="col-sm-4">
                                    <select 
                                        className={this.state.bordaValidacao['terceiro']}
                                        name="terceiro"
                                        disabled={this.state.estado.campoTimesDesabilitado}
                                        value={this.state.terceiro}
                                        onChange={(event) => this.handleUserInput(event)}>
                                        <option value=''selected>  Selecione um Terceiro </option>
                                        {this.state.selecoes}
                                    </select>
                                <span className="text text-danger">{this.state.mensagensValidacao['terceiro']}</span>
                            </div>
                            <label className="col-sm-2 control-label" htmlFor="quarto">Quarto</label>
                            <div className="col-sm-4">
                                    <select 
                                        className={this.state.bordaValidacao['quarto']}
                                        name="quarto"
                                        disabled={this.state.estado.campoTimesDesabilitado}
                                        value={this.state.quarto}
                                        onChange={(event) => this.handleUserInput(event)}>
                                        <option value=''selected> Selecione um Quarto </option>
                                        {this.state.selecoes}
                                    </select>
                                <span className="text text-danger">{this.state.mensagensValidacao['quarto']}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-12">
                            
                                <a className="btn btn-default"
                                    type="submit"
                                    name="enviar"
                                   
                                    onClick={() => this.handleEnviarResultado()}>
                                    Conferir Resultado
                                </a>
                            
                            </div>
                        </div>
                    </form>

                    <div className="content-section implementation" >
                    
                    <DataTable value={this.state.ganhadores} paginator={true} rows={10}>
                        <Column field="palpiteiro.nome" header="Palpiteiro"  />
                        <Column field="palpiteiro.email" header="Email"  />
                        <Column field="palpiteiro.telefone" header="Telefone" />
                    </DataTable>
         
                </div>

 
                </div>
            </div>   
        );
    }
    
    handleUserInput(e) {
        const nome = e.target.name;
        const valor = e.target.value;
        const mensagensValidacao = Object.assign({}, this.state.mensagensValidacao);
        mensagensValidacao[nome] = this.validarCampo({ nome, valor });
        this.setState({
            [nome]: valor,
            mensagensValidacao,
        });
    }

    validarCampo({ nome, valor = null }) {
        if (valor === null) {
            valor = this.state[nome];
        }

        //Valida os campos e muda as bordas para verde ou vermelha
        if (nome === 'campeao'){
            if(valor === ''){
                this.state.bordaValidacao[nome] = 'form-control has-error';
                return 'Não pode ser vazio';
            }else if (valor === this.state.vice){
                this.state.bordaValidacao[nome] = 'form-control has-error';
                return 'Campeao não pode ser igual ao Vice';
            }else if (valor === this.state.terceiro){
                this.state.bordaValidacao[nome] = 'form-control has-error';
                return 'Campeao não pode ser igual ao Terceiro';
            }else if (valor === this.state.quarto){
                this.state.bordaValidacao[nome] = 'form-control has-error';
                return 'Campeao não pode ser igual ao Quarto';
            }
            this.state.bordaValidacao[nome] = 'form-control has-success';   
        }else if (nome === 'vice'){
            if(valor === ''){
                this.state.bordaValidacao[nome] = 'form-control has-error';
                return 'Não pode ser vazio';
            }else if (valor === this.state.campeao){
                this.state.bordaValidacao[nome] = 'form-control has-error';
                return 'Vice não pode ser igual ao Campeao';
            }else if (valor === this.state.terceiro){
                this.state.bordaValidacao[nome] = 'form-control has-error';
                return 'Vice não pode ser igual ao Terceiro';
            }else if (valor === this.state.quarto){
                this.state.bordaValidacao[nome] = 'form-control has-error';
                return 'Vice não pode ser igual ao Quarto';
            }
            this.state.bordaValidacao[nome] = 'form-control has-success';
        }else if (nome === 'terceiro'){
            if(valor === ''){
                this.state.bordaValidacao[nome] = 'form-control has-error';
                return 'Não pode ser vazio';
            }else if (valor === this.state.campeao){
                this.state.bordaValidacao[nome] = 'form-control has-error';
                return 'Terceiro não pode ser igual ao Campeao';
            }else if (valor === this.state.vice){
                this.state.bordaValidacao[nome] = 'form-control has-error';
                return 'Terceiro não pode ser igual ao Vice';
            }else if (valor === this.state.quarto){
                this.state.bordaValidacao[nome] = 'form-control has-error';;
                return 'Terceiro não pode ser igual ao Quarto';
            }
            this.state.bordaValidacao[nome] = 'form-control has-success';
        }else if (nome === 'quarto'){
            if(valor === ''){
                this.state.bordaValidacao[nome] = 'form-control has-error';;
                return 'Não pode ser vazio';
            }else if (valor === this.state.campeao){
                this.state.bordaValidacao[nome] = 'form-control has-error';
                return 'Quarto não pode ser igual ao Campeao';
            }else if (valor === this.state.vice){
                this.state.bordaValidacao[nome] = 'form-control has-error';
                return 'Quarto não pode ser igual ao Vice';
            }else if (valor === this.state.terceiro){
                this.state.bordaValidacao[nome] = 'form-control has-error';
                return 'Quarto não pode ser igual ao Terceiro';
            }
            this.state.bordaValidacao[nome] = 'form-control has-success';
        }
        return '';
    } 
    
    validarFormulario() {
        const mensagensValidacao = Object.assign({}, this.state.mensagensValidacao);
        let temErro = false;
        for (let campo in mensagensValidacao) {
            const msg = this.validarCampo({ nome: campo });
            mensagensValidacao[campo] = msg;
            if (msg !== '') temErro = true;
        }
        this.setState({ mensagensValidacao });
        return !temErro;
    }

    handleEnviarResultado() {
        if (!this.validarFormulario()) {
            this.setState({ estado: NovoResultadoMaquinaEstados.inicio() });
            this.mostrarErro('Atenção! Alguns campos não foram corretamente preenchidos!');
            return;
        }
        try {
            var source = 'http://localhost:8080/BolaoDaCopaV2RS/webresources/palpite/ganhadores?campeao='+this.state.campeao+'&vice='+this.state.vice+'&terceiro='+this.state.terceiro+'&quarto='+this.state.quarto;
            axios.get(source) 
            .then(res => {
                this.setState({ ganhadores: res.data });  
           });

        } catch (e) {
            this.mostrarErro('Ocorreu um problema!');
            console.log(e);
        }
    }

    mostrarAviso(mensagem) { this.setState({ mensagem, mensagemClassName: 'alert alert-warning', }); }
    mostrarInfo(mensagem) { this.setState({ mensagem, mensagemClassName: 'alert alert-info', }); }
    mostrarSucesso(mensagem) { this.setState({ mensagem, mensagemClassName: 'alert alert-success', }); }
    mostrarErro(mensagem) { this.setState({ mensagem, mensagemClassName: 'alert alert-danger', }); }


}




export default Resultado;