package com.sistel.codbar;

import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.widget.Toast;

import com.sistel.codbar.Interface.JsonPlaceHolderApi;
import com.sistel.codbar.Model.Producto;

import me.dm7.barcodescanner.zbar.Result;
import me.dm7.barcodescanner.zbar.ZBarScannerView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class SimpleScannerActivity extends Activity implements ZBarScannerView.ResultHandler {

    private ZBarScannerView mScannerView;
    private boolean productoRegistrado;
    private final String urlBase = "https://codbar-api.herokuapp.com/api/";

    @Override
    public void onCreate(Bundle state) {
        super.onCreate(state);
        mScannerView = new ZBarScannerView(this);
        setContentView(mScannerView);
    }

    @Override
    public void onResume() {
        super.onResume();
        mScannerView.setResultHandler(this);
        mScannerView.startCamera();
    }

    @Override
    public void onPause() {
        super.onPause();
        mScannerView.startCamera();
    }

    @Override
    public void handleResult(Result rawResult) {
        getByCodBarProducto(rawResult.getContents());

        if(productoRegistrado) {
            Toast.makeText(this, "Producto " + rawResult.getContents() + " Registrado", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(this, "Producto no existe", Toast.LENGTH_SHORT).show();
        }

        Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                mScannerView.resumeCameraPreview(SimpleScannerActivity.this);
            }
        }, 2000);
    }

    public void getByCodBarProducto(String codBar) {
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(urlBase)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        JsonPlaceHolderApi jsonPlaceHolderApi = retrofit.create(JsonPlaceHolderApi.class);
        Call<Producto> call = jsonPlaceHolderApi.getByCodBarProducto(codBar);
        call.enqueue(new Callback<Producto>() {
            @Override
            public void onResponse(Call<Producto> call, Response<Producto> response) {
                if(!response.isSuccessful()) {
                    productoRegistrado = false;
                    return;
                }
                productoRegistrado = true;
            }

            @Override
            public void onFailure(Call<Producto> call, Throwable t) {
                productoRegistrado = false;
            }
        });
    }
}
