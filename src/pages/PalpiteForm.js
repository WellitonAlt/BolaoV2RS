import React from 'react';
import NovoPalpiteMaquinaEstados from './NovoPalpiteMaquinaEstados';

class PalpiteForm extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            senha: '',
            nome: '',
            telefone: '',
            dataDeNascimento: '',
            campeao: '',
            vice: '',
            terceiro: '',
            quarto: '',
            confirmarSenha: '',
            estado: NovoPalpiteMaquinaEstados.inicio(),
            mensagem: 'Digite seu e-mail para dar início',
            mensagemClassName: 'alert alert-info',
            usuarioEncontrado: null,
            mostrarAjaxLoader: false,
            mensagensValidacao: {
                email: '',
                senha: '',
                nome: '',
                telefone: '',
                dataDeNascimento: '',
                campeao: '',
                vice: '',
                terceiro: '',
                quarto: '',
                confirmarSenha: '',
            },
            //Controla as bordas dos inputs
            bordaValidacao: {
                email: 'form-control',
                senha: 'form-control',
                nome: 'form-control',
                telefone: 'form-control',
                dataDeNascimento: 'form-control',
                campeao: 'form-control',
                vice: 'form-control',
                terceiro: 'form-control',
                quarto: 'form-control',
                confirmarSenha: 'form-control',
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
      }

    render() {

        return (
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h4>Novo palpite</h4>
                    <form className="form-horizontal" name="formPalpite">
                        <div className={this.state.mensagemClassName}>
                            {this.state.mensagem}
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="email">E-mail</label>
                            <div className="col-sm-4">
                                <input type="text"
                                    className={this.state.bordaValidacao['email']}
                                    name="email"
                                    label="E-mail"
                                    value={this.state.email}
                                    onChange={(event) => this.handleUserInput(event)}
                                    onBlur={() => this.handleEmailChanged()}>
                                </input>
                                <span className="text text-danger">{this.state.mensagensValidacao['email']}</span>
                            </div>
                            <label className="col-sm-2 control-label" htmlFor="senha">Senha</label>
                            <div className="col-sm-4">
                                <input type="password"
                                    className={this.state.bordaValidacao['senha']}
                                    name="senha"
                                    label="Senha"
                                    disabled={this.state.estado.campoSenhaDesabilitado}
                                    value={this.state.senha}
                                    onChange={(event) => this.handleUserInput(event)}
                                    onBlur={() => this.handleSenhaChanged()}>
                                </input>
                                <span className="text text-danger">{this.state.mensagensValidacao['senha']}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="nome">Nome completo</label>
                            <div className="col-sm-10">
                                <input type="text"
                                    className={this.state.bordaValidacao['nome']}
                                    name="nome"
                                    label="Nome"
                                    disabled={this.state.estado.camposDadosPessoaisDesabilitados}
                                    value={this.state.nome}
                                    onChange={(event) => this.handleUserInput(event)}>
                                </input>
                                <span className="text text-danger">{this.state.mensagensValidacao['nome']}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="telefone">Telefone</label>
                            <div className="col-sm-4">
                                <input type="text"
                                    className={this.state.bordaValidacao['telefone']}
                                    name="telefone"
                                    label="Telefone"
                                    disabled={this.state.estado.camposDadosPessoaisDesabilitados}
                                    value={this.state.telefone}
                                    onChange={(event) => this.handleUserInput(event)}>
                                </input>
                                <span className="text text-danger">{this.state.mensagensValidacao['telefone']}</span>
                            </div>
                            <label className="col-sm-3 control-label" htmlFor="dataDeNascimento">Data de nascimento</label>
                            <div className="col-sm-3">
                                <input type="date"
                                    className={this.state.bordaValidacao['dataDeNascimento']}
                                    name="dataDeNascimento"
                                    label="Data de nascimento"
                                    disabled={this.state.estado.camposDadosPessoaisDesabilitados}
                                    value={this.state.dataDeNascimento}
                                    onChange={(event) => this.handleUserInput(event)}>
                                </input>
                                <span className="text text-danger">{this.state.mensagensValidacao['dataDeNascimento']}</span>
                            </div>
                        </div>

                        <div className='form-group'>
                            <label className="col-sm-2 control-label" htmlFor="campeao">Campeão</label>
                            <div className="col-sm-4">
                                    <select 
                                        className={this.state.bordaValidacao['campeao']}
                                        name="campeao"
                                        disabled={this.state.estado.camposDadosPalpiteDesabilitados}
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
                                        disabled={this.state.estado.camposDadosPalpiteDesabilitados}
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
                                        disabled={this.state.estado.camposDadosPalpiteDesabilitados}
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
                                        disabled={this.state.estado.camposDadosPalpiteDesabilitados}
                                        value={this.state.quarto}
                                        onChange={(event) => this.handleUserInput(event)}>
                                        <option value=''selected> Selecione um Quarto </option>
                                        {this.state.selecoes}
                                    </select>
                                <span className="text text-danger">{this.state.mensagensValidacao['quarto']}</span>
                            </div>
                            {this.state.estado.campoConfirmacaoSenhaVisivel && (
                                <label className="col-sm-2 control-label" htmlFor="confirmarSenha">Confirme a senha</label>
                            )}
                            <div className="col-sm-4">
                                {this.state.estado.campoConfirmacaoSenhaVisivel && (
                                    <input type="password"
                                        className={this.state.bordaValidacao['confirmarSenha']}
                                        name="confirmarSenha"
                                        label="Confirmação de senha"
                                        value={this.state.confirmarSenha}
                                        onChange={(event) => this.handleUserInput(event)}>
                                    </input>
                                )}
                                <span className="text text-danger">{this.state.mensagensValidacao['confirmarSenha']}</span>
                            </div>
                        </div>
                        <div className= 'form-group'>
                            <div className="col-sm-6">
                                {this.state.estado.botaoConfirmarPalpiteVisivel && (
                                    <a type="submit"
                                        className="btn btn-success"
                                        name="confirmar"
                                        onClick={() => this.handleConfirmarPalpiteClicked()}>
                                        Confirmar meu palpite
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-12">
                                <a className="btn btn-default"
                                    name="enviar"
                                    disabled={this.state.estado.botaoEnvioDesabilitado}
                                    onClick={() => this.handleEnviarPalpiteClicked()}>
                                    Enviar meu palpite
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
                {this.state.mostrarAjaxLoader && (<div className='ajaxLoaderClass' />)}
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
        if (nome === 'email') {
            if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(valor)) {
                this.state.bordaValidacao[nome] = 'form-control has-error';
                return 'E-mail está em formato incorreto';
            }
            this.state.bordaValidacao[nome] = 'form-control has-success';
        } else if (nome === 'senha') {
            if (valor.length === 0) {
                this.state.bordaValidacao[nome] = 'form-control has-error';
                return 'Senha não pode ser vazia';
            } else if (this.state.usuarioEncontrado === null) {
                if (valor.length < 6) {
                    this.state.bordaValidacao[nome] = 'form-control has-error';
                    return 'Senha muito curta';
                }
            }
            this.state.bordaValidacao[nome] = 'form-control has-success';
        }else if (nome === 'campeao'){
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
        }else if (nome === 'nome' || nome === 'telefone' || nome === 'dataDeNascimento') {
            if (valor === '') {
                this.state.bordaValidacao[nome] = 'form-control has-error';
                return 'Não pode ser vazio';
            }
            this.state.bordaValidacao[nome] = 'form-control has-success';
        } else if (nome === 'confirmarSenha') {
            if (this.state.usuarioEncontrado === null && this.state.estado.botaoConfirmarPalpiteVisivel) {
                const senha = this.state.senha;
                if (valor !== senha) {
                    this.state.bordaValidacao[nome] = 'form-control has-error';
                    return 'Confirmação da senha não confere';
                }
                this.state.bordaValidacao[nome] = 'form-control has-success';
            }
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

    async handleEmailChanged() {
        if (this.validarCampo({ nome: 'email' }) !== '') return;
        this.mostrarAjaxLoader();
        try {
            const response = await fetch('http://localhost:8080/BolaoDaCopaV2RS/webresources/usuario?email=' + this.state.email);
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const usuarioJson = await response.json();
                //Testa para ver o limite de Palpites
                if(usuarioJson.nPalpites < usuarioJson.maxPalpites){              
                    this.setState({
                        estado: NovoPalpiteMaquinaEstados.usuarioExistente(),
                        usuarioEncontrado: usuarioJson
                    });                    
                    this.mostrarAviso('E-mail já cadastrado! Informe sua senha para enviar o palpite');
                }else{
                    this.mostrarAviso('Limite de palpites do usuario foi excedido, não é posivel palpitar novamente');  
                }      
            } else {
                this.setState({ estado: NovoPalpiteMaquinaEstados.usuarioInexistente() });
                this.mostrarInfo('E-mail ainda não cadastrado! Informe uma nova senha e demais dados para cadastro');
            }
        } catch (e) {
            this.mostrarErro('Ocorreu um problema!');
            console.log(e);
        }
        this.ocultarAjaxLoader();
    }

    handleSenhaChanged() {
        if (!this.state.estado.eventoSenhaDesabilitado) {
            if (this.state.senha === this.state.usuarioEncontrado.senha) {
                const d = new Date(this.state.usuarioEncontrado.dataDeNascimento.slice(0, -5));
                this.setState({
                    nome: this.state.usuarioEncontrado.nome,
                    telefone: this.state.usuarioEncontrado.telefone,
                    dataDeNascimento: d.toISOString().slice(0, 10),
                });
                this.state.bordaValidacao['nome'] = 'form-control has-success';
                this.state.bordaValidacao['telefone'] = 'form-control has-success';
                this.state.bordaValidacao['dataDeNascimento'] = 'form-control has-success';
                this.setState({ estado: NovoPalpiteMaquinaEstados.usuarioExistenteSenhaCorreta() });
                this.mostrarSucesso('Senha correta! Informe seu palpite!');


            } else {
                this.setState({ estado: NovoPalpiteMaquinaEstados.usuarioExistenteSenhaIncorreta() });
                this.mostrarErro('Senha incorreta! Informe novamente!');
            }
        }
    }

    handleEnviarPalpiteClicked() {
        if (!this.validarFormulario()) {
            this.setState({ estado: NovoPalpiteMaquinaEstados.usuarioExistenteSenhaCorreta() });
            this.mostrarErro('Atenção! Alguns campos não foram corretamente preenchidos!');
            return;
        }

        if (this.state.usuarioEncontrado === null) {
            this.setState({ estado: NovoPalpiteMaquinaEstados.confirmarPalpiteUsuarioInexistente() });
            this.mostrarInfo('Verifique os dados, repita sua nova senha e confirme o palpite. Atenção, ao confirmar o palpite você concorda em pagar R$ 20,00');
        } else {
            this.setState({ estado: NovoPalpiteMaquinaEstados.confirmarPalpiteUsuarioExistente() });
            this.mostrarInfo('Verifique os dados e confirme o palpite. Atenção, ao confirmar o palpite você concorda em pagar R$ 20,00');
        }
    }

    async handleConfirmarPalpiteClicked() {
        if (!this.validarFormulario()) {
            this.mostrarErro('Atenção! Alguns campos não foram corretamente preenchidos!');
            return;
        }
        this.mostrarAjaxLoader();
        try {
            const novoPalpite = {
                campeao: this.state.campeao,
                vice: this.state.vice,
                terceiro: this.state.terceiro,
                quarto: this.state.quarto,
                palpiteiro: {
                    id: null,
                }
            };
            if (this.state.usuarioEncontrado === null) {
                const novoUsuario = {
                    nome: this.state.nome,
                    senha: this.state.senha,
                    email: this.state.email,
                    telefone: this.state.telefone,
                    dataDeNascimento: new Date(this.state.dataDeNascimento),
                };
                const response = await fetch('http://localhost:8080/BolaoDaCopaV2RS/webresources/usuario', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(novoUsuario),
                })
                const usuarioGravado = await response.json();
                novoPalpite.palpiteiro.id = usuarioGravado.id;
            } else {
                novoPalpite.palpiteiro.id = this.state.usuarioEncontrado.id;
            }
            await fetch('http://localhost:8080/BolaoDaCopaV2RS/webresources/palpite', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(novoPalpite),
            });


            this.mostrarSucesso(`Obrigado pelo palpite, ${this.state.nome}!`);
            this.setState({
                email: '',
                senha: '',
                nome: '',
                telefone: '',
                dataDeNascimento: '',
                campeao: '',
                vice: '',
                quarto: '',
                terceiro: '',
                confirmarSenha: '',
                usuarioEncontrado: null,
                bordaValidacao: {
                    email: 'form-control',
                    senha: 'form-control',
                    nome: 'form-control',
                    telefone: 'form-control',
                    dataDeNascimento: 'form-control',
                    campeao: 'form-control',
                    vice: 'form-control',
                    terceiro: 'form-control',
                    quarto: 'form-control',
                    confirmarSenha: 'form-control',
                },
            });
            this.setState({ estado: NovoPalpiteMaquinaEstados.inicio() });
        } catch (e) {
            this.mostrarErro('Ocorreu um problema!');
            console.log(e);
        }
        this.ocultarAjaxLoader();
    }





    mostrarAviso(mensagem) { this.setState({ mensagem, mensagemClassName: 'alert alert-warning', }); }
    mostrarInfo(mensagem) { this.setState({ mensagem, mensagemClassName: 'alert alert-info', }); }
    mostrarSucesso(mensagem) { this.setState({ mensagem, mensagemClassName: 'alert alert-success', }); }
    mostrarErro(mensagem) { this.setState({ mensagem, mensagemClassName: 'alert alert-danger', }); }

    mostrarAjaxLoader() { this.setState({ mostrarAjaxLoader: true }); }
    ocultarAjaxLoader() { this.setState({ mostrarAjaxLoader: false }); }

}




export default PalpiteForm;