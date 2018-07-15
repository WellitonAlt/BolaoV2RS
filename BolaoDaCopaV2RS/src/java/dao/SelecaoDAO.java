/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import beans.Selecao;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;
import javax.enterprise.context.RequestScoped;
import javax.sql.DataSource;

@RequestScoped
public class SelecaoDAO {
    
    private final static String LISTAR_SELECOES_SQL = "select"
            + " id, nome "
            + " from selecao";

    @Resource(name = "jdbc/Bolao2DBLocal")
    DataSource dataSource;
    
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
}
