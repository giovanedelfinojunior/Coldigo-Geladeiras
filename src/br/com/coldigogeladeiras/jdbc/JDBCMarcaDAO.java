package br.com.coldigogeladeiras.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import br.com.coldigogeladeiras.jdbcinterface.MarcaDAO;
import br.com.coldigogeladeiras.modelo.Marca;

public class JDBCMarcaDAO implements MarcaDAO {
	private Connection conexao;
	
	public JDBCMarcaDAO(Connection conexao) {
		this.conexao = conexao;
	}
	
	public List<Marca> buscar() {
		String comando = "SELECT * FROM marcas";
		
		List<Marca> listMarcas = new ArrayList<Marca>();
		
		Marca marca = null;
		
		try {
			Statement stmt = conexao.createStatement();
			
			ResultSet rs = stmt.executeQuery(comando);
			
			while (rs.next()) {
				marca = new Marca();
				
				int id = rs.getInt("id");
				String nome = rs.getString("nome");
				
				marca.setId(id);
				marca.setNome(nome);
				
				listMarcas.add(marca);
				
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		
		return listMarcas;
	}
	
	public boolean inserir(Marca marca) {
		String comando = "INSERT INTO marcas " + "(id, nome) " + "VALUES (?,?)";
		
		PreparedStatement p;
		
		try {
			p = this.conexao.prepareStatement(comando);
			
			p.setInt(1, marca.getId());
			p.setString(2, marca.getNome());
			
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		
		return true;
	}
	
	public boolean deletar(int id) {
		String comando = "DELETE FROM marcas WHERE id = ?";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			p.execute();
		}catch(SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public Marca buscarPorId(int id) {
		String comando = "SELECT * FROM marcas WHERE marcas.id = ?";
		Marca marca = new Marca();
		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			ResultSet rs = p.executeQuery();
			while(rs.next()) {
				
				String nome = rs.getString("nome");
				
				marca.setId(id);
				marca.setNome(nome);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return marca;
	}
	
	public boolean alterar(Marca marca) {
		String comando = "UPDATE marcas "
				+"SET nome=?" 
				+" WHERE id=?";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setString(1, marca.getNome());
			p.setInt(2, marca.getId());
			p.executeUpdate();
		}catch(SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
}
