package com.sistel.codbar.Interface;

import com.sistel.codbar.Model.Producto;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface JsonPlaceHolderApi {

    @GET("productos")
    Call<List<Producto>> getProductos();

    @GET("productos/{id}")
    Call<Producto> getByIdProducto(@Path("id") String id);

    @GET("productos/codbar/{codBar}")
    Call<Producto> getByCodBarProducto(@Path("codBar") String codBar);

}
