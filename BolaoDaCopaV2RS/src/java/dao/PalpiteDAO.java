/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

// PalpiteDAO

import beans.Palpite;
import beans.Selecao;
import beans.Usuario;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;
import javax.enterprise.context.RequestScoped;
import javax.sql.DataSource;

@RequestScoped
public class PalpiteDAO {

    private final static String CRIAR_PALPITE_SQL = "insert into Palpite"
            + " (campeao, vice, palpiteiro, terceiro, quarto)"
            + " values (?,?,?,?,?)";

    private final static String LISTAR_PALPITES_SQL = "select"
            + " p.id as palpiteId, p.campeao, p.vice, p.terceiro, p.quarto,"
            + " u.id as usuarioId, u.nome, u.email, u.telefone, u.dataDeNascimento"
            + " from Palpite p inner join Usuario u on p.palpiteiro = u.id";

    private final static String LISTAR_SELECOES_SQL = "select"
            + " distinct(selecao) from"
            + " (select campeao as selecao from palpite"
            + " union"
            + " select vice as selecao from palpite) selecoes"
            + " order by upper(selecao)";
    
    private final static String LISTAR_SELECAO_SQL = "select"
            + " id, nome "
            + " from selecao";
    
    private final static String ATUALIZA_PALPITES_SQL = "update usuario"
            + " set npalpites = ?"
            + " where id = ?";
    
    private final static String LISTAR_PALPITES_GANHADORES_SQL = "select"
            + " p.id as palpiteId, p.campeao, p.vice, p.terceiro, p.quarto,"
            + " u.id as usuarioId, u.nome, u.email, u.telefone, u.dataDeNascimento"
            + " from Palpite p inner join Usuario u on p.palpiteiro = u.id"
            + " where p.campeao = ? and p.vice = ? and p.terceiro = ? and p.quarto = ?";
    

    @Resource(name = "jdbc/Bolao2DBLocal")
    DataSource dataSource;

    public Palpite gravarPalpite(Palpite p) throws SQLException {
        try (Connection con = dataSource.getConnection();
                PreparedStatement ps = con.prepareStatement(CRIAR_PALPITE_SQL, Statement.RETURN_GENERATED_KEYS);) {
            ps.setString(1, p.getCampeao());
            ps.setString(2, p.getVice());
            ps.setInt(3, p.getPalpiteiro().getId());
            ps.setString(4, p.getTerceiro());
            ps.setString(5, p.getQuarto());
            ps.execute();
            atualizaPalpites(p.getPalpiteiro().getId(), p.getPalpiteiro().getnPalpites());
            try (ResultSet rs = ps.getGeneratedKeys()) {
                rs.next();
                p.setId(rs.getInt(1));
            }
        }
        return p;
    }

    public List<Palpite> listarTodosPalpites() throws SQLException {
        List<Palpite> ret = new ArrayList<>();
        try (Connection con = dataSource.getConnection();
                PreparedStatement ps = con.prepareStatement(LISTAR_PALPITES_SQL)) {
            
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Palpite p = new Palpite();
                    Usuario u = new Usuario();
                    p.setId(rs.getInt("palpiteId"));
                    p.setCampeao(rs.getString("campeao"));
                    p.setVice(rs.getString("vice"));
                    p.setTerceiro(rs.getString("terceiro"));
                    p.setQuarto(rs.getString("quarto"));                    
                    u.setId(rs.getInt("usuarioId"));
                    u.setNome(rs.getString("nome"));
                    u.setEmail(rs.getString("email"));
                    u.setTelefone(rs.getString("telefone"));
                    u.setDataDeNascimento(new Date(rs.getDate("dataDeNascimento").getTime()));
                    p.setPalpiteiro(u);
                    ret.add(p);
                }
            }
        }
        return ret;
    }

    public List<String> listarTodasSelecoes() throws SQLException {
        List<String> ret = new ArrayList<>();
        try (Connection con = dataSource.getConnection();
                PreparedStatement ps = con.prepareStatement(LISTAR_SELECOES_SQL)) {

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    String s = rs.getString("selecao");
                    ret.add(s);
                }
            }
        }
        return ret;
    }
    
    public List<Selecao> listaSelecoes() throws SQLException {
        List<Selecao> ret = new ArrayList<>();
        try (Connection con = dataSource.getConnection();
                PreparedStatement ps = con.prepareStatement(LISTAR_SELECOES_SQL)) {

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Selecao s =  new Selecao();
                    s.setId(rs.getInt("id"));
                    s.setNome(rs.getString("nome"));
                    ret.add(s);
                }
            }
        }
        return ret;
    }
    
     public void atualizaPalpites(int id, int nPalpites) throws SQLException {
        try (Connection con = dataSource.getConnection();
                PreparedStatement ps = con.prepareStatement(ATUALIZA_PALPITES_SQL)) {
            System.out.println("3");
            nPalpites++;
            ps.setInt(1, nPalpites);
            ps.setInt(2, id);
            ps.execute();
        }catch(NullPointerException ex){}

    }
     
     public List<Palpite> listarTodosPalpitesGanhadores(String campeao, String vice, String terceiro, String quarto) 
             throws SQLException {
        List<Palpite> ret = new ArrayList<>();
        try (Connection con = dataSource.getConnection();
                PreparedStatement ps = con.prepareStatement(LISTAR_PALPITES_GANHADORES_SQL)) {
            ps.setString(1, campeao);
            ps.setString(2, vice);
            ps.setString(3, terceiro);
            ps.setString(4, quarto);
            
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Palpite p = new Palpite();
                    Usuario u = new Usuario();
                    p.setId(rs.getInt("palpiteId"));
                    p.setCampeao(rs.getString("campeao"));
                    p.setVice(rs.getString("vice"));
                    p.setTerceiro(rs.getString("terceiro"));
                    p.setQuarto(rs.getString("quarto"));                    
                    u.setId(rs.getInt("usuarioId"));
                    u.setNome(rs.getString("nome"));
                    u.setEmail(rs.getString("email"));
                    u.setTelefone(rs.getString("telefone"));
                    u.setDataDeNascimento(new Date(rs.getDate("dataDeNascimento").getTime()));
                    p.setPalpiteiro(u);
                    ret.add(p);
                }
            }
        }
        return ret;
    }
}