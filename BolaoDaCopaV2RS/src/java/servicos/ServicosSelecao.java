package servicos;


import beans.Selecao;
import dao.SelecaoDAO;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Stateless
@Path("selecao")
public class ServicosSelecao {


    @Inject
    SelecaoDAO selecaoDao;


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSelecoes() {
        simularDemora();
        try {
            return Response.ok(selecaoDao.listaSelecoes()).build();
        } catch (SQLException ex) {
            Logger.getLogger(ServicosSelecao.class.getName()).log(Level.SEVERE, null, ex);
            return Response.serverError().build();
        }
    }
    
    private void simularDemora() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException ex) {
            Logger.getLogger(ServicosSelecao.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}