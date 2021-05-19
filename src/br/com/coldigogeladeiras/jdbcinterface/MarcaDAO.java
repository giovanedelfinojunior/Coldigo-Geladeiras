package br.com.coldigogeladeiras.jdbcinterface;

import java.util.List;

import com.google.gson.JsonObject;

import br.com.coldigogeladeiras.modelo.Marca;

public interface MarcaDAO {
	
	public List<Marca> buscar();
	public boolean inserir(Marca marca);
	public boolean deletar(int id);
}
