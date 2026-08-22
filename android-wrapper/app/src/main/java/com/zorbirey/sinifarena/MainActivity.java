package com.zorbirey.sinifarena;

import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Build;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.webkit.RenderProcessGoneDetail;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

public class MainActivity extends Activity {
    private FrameLayout root;
    private WebView webView;
    private int lastLeft=-1,lastTop=-1,lastRight=-1,lastBottom=-1;
    private boolean destroyed=false;

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        configureSystemBars();
        root = new FrameLayout(this);
        root.setBackgroundColor(Color.rgb(2,8,23));
        setContentView(root);
        if (state == null) showGate(); else showApp(state);
    }

    private void configureSystemBars() {
        try { getWindow().setStatusBarColor(Color.rgb(2,8,23)); } catch (Throwable ignored) {}
        try { getWindow().setNavigationBarColor(Color.BLACK); } catch (Throwable ignored) {}
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            try {
                getWindow().setDecorFitsSystemWindows(false);
                WindowInsetsController c = getWindow().getInsetsController();
                if (c != null) c.setSystemBarsAppearance(0,
                    WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS |
                    WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS);
            } catch (Throwable ignored) {}
        }
    }

    private void showGate() {
        root.removeAllViews();
        root.setBackgroundColor(Color.rgb(2,8,23));

        FrameLayout gate = new FrameLayout(this);
        gate.setBackgroundColor(Color.rgb(2,8,23));
        root.addView(gate, new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));

        LinearLayout column = new LinearLayout(this);
        column.setOrientation(LinearLayout.VERTICAL);
        column.setGravity(Gravity.CENTER_HORIZONTAL);
        column.setPadding(dp(18), dp(18), dp(18), dp(24));
        gate.addView(column, new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));

        TextView kicker = new TextView(this);
        kicker.setText("⚡  ZEUS DESTEKLİ EĞİTİM ARENASI");
        kicker.setTextColor(Color.rgb(169,232,255));
        kicker.setTextSize(13);
        kicker.setGravity(Gravity.CENTER);
        kicker.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        LinearLayout.LayoutParams kickerLp = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        kickerLp.topMargin = dp(10);
        column.addView(kicker, kickerLp);

        ImageView zeus = new ImageView(this);
        zeus.setScaleType(ImageView.ScaleType.CENTER_INSIDE);
        zeus.setAdjustViewBounds(true);
        zeus.setBackgroundColor(Color.TRANSPARENT);
        try {
            BitmapFactory.Options options = new BitmapFactory.Options();
            options.inPreferredConfig = Bitmap.Config.ARGB_8888;
            options.inScaled = true;
            Bitmap bm = BitmapFactory.decodeResource(getResources(), R.drawable.zeus_splash, options);
            if (bm != null) {
                zeus.setImageBitmap(bm);
                zeus.setImageAlpha(255);
            }
        } catch (Throwable ignored) {}
        LinearLayout.LayoutParams imageLp = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, 0, 1f);
        imageLp.topMargin = dp(8);
        imageLp.bottomMargin = dp(4);
        column.addView(zeus, imageLp);

        TextView title = new TextView(this);
        title.setText("9. SINIF\nARENA 2027");
        title.setTextColor(Color.WHITE);
        title.setTextSize(34);
        title.setGravity(Gravity.CENTER);
        title.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        column.addView(title, new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        TextView tag = new TextView(this);
        tag.setText("INSPIRED FROM ZEUS");
        tag.setTextColor(Color.rgb(242,189,88));
        tag.setTextSize(12);
        tag.setGravity(Gravity.CENTER);
        tag.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        LinearLayout.LayoutParams tagLp = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        tagLp.topMargin = dp(6);
        column.addView(tag, tagLp);

        Button enter = new Button(this);
        enter.setText("ARENAYA GİR");
        enter.setTextSize(18);
        enter.setTextColor(Color.WHITE);
        enter.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        enter.setAllCaps(false);
        enter.setBackgroundColor(Color.rgb(36,123,238));
        enter.setOnClickListener(v -> showApp(null));
        LinearLayout.LayoutParams btnLp = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, dp(58));
        btnLp.setMargins(dp(28), dp(16), dp(28), 0);
        column.addView(enter, btnLp);

        gate.setOnApplyWindowInsetsListener((v, insets) -> {
            int l=0,t=0,r=0,b=0;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                android.graphics.Insets sys = insets.getInsets(
                    WindowInsets.Type.systemBars() | WindowInsets.Type.displayCutout());
                l=sys.left;t=sys.top;r=sys.right;b=sys.bottom;
            } else {
                l=insets.getSystemWindowInsetLeft(); t=insets.getSystemWindowInsetTop();
                r=insets.getSystemWindowInsetRight(); b=insets.getSystemWindowInsetBottom();
            }
            gate.setPadding(l,t,r,b);
            return insets;
        });
        try { gate.requestApplyInsets(); } catch (Throwable ignored) {}
    }

    private void showApp(Bundle state) {
        if (destroyed || root == null) return;
        destroyWebView();
        root.removeAllViews();
        root.setBackgroundColor(Color.rgb(2,8,23));
        try { webView = new WebView(this); } catch (Throwable e) { showGate(); return; }
        webView.setBackgroundColor(Color.rgb(2,8,23));
        root.addView(webView, new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        applySafeInsets();
        configureWebView();
        boolean restored=false;
        if (state != null) try { restored = webView.restoreState(state) != null; } catch (Throwable ignored) {}
        if (!restored) webView.loadUrl("file:///android_asset/index.html");
    }

    private void applySafeInsets() {
        root.setOnApplyWindowInsetsListener((v, insets) -> {
            int left,top,right,bottom;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                android.graphics.Insets sys=insets.getInsets(WindowInsets.Type.systemBars() | WindowInsets.Type.displayCutout());
                left=sys.left; top=sys.top; right=sys.right; bottom=sys.bottom;
            } else {
                left=insets.getSystemWindowInsetLeft(); top=insets.getSystemWindowInsetTop();
                right=insets.getSystemWindowInsetRight(); bottom=insets.getSystemWindowInsetBottom();
            }
            if (webView != null && (left!=lastLeft || top!=lastTop || right!=lastRight || bottom!=lastBottom)) {
                lastLeft=left; lastTop=top; lastRight=right; lastBottom=bottom;
                FrameLayout.LayoutParams lp=(FrameLayout.LayoutParams)webView.getLayoutParams();
                lp.setMargins(left,top,right,bottom); webView.setLayoutParams(lp);
            }
            return insets;
        });
        try { root.requestApplyInsets(); } catch (Throwable ignored) {}
    }

    private void configureWebView() {
        WebSettings s=webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(true);
        s.setAllowContentAccess(true);
        s.setJavaScriptCanOpenWindowsAutomatically(false);
        s.setSupportMultipleWindows(false);
        s.setCacheMode(WebSettings.LOAD_NO_CACHE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            try { webView.setRendererPriorityPolicy(WebView.RENDERER_PRIORITY_IMPORTANT,true); } catch(Throwable ignored){}
        }
        webView.setWebViewClient(new WebViewClient(){
            @Override public boolean onRenderProcessGone(WebView view, RenderProcessGoneDetail detail){
                showGate(); return true;
            }
        });
        webView.setWebChromeClient(new WebChromeClient());
    }

    private int dp(int v){ return Math.round(v*getResources().getDisplayMetrics().density); }

    private void destroyWebView(){
        if(webView==null)return; WebView old=webView; webView=null;
        try{if(old.getParent() instanceof ViewGroup)((ViewGroup)old.getParent()).removeView(old);}catch(Throwable ignored){}
        try{old.stopLoading();}catch(Throwable ignored){}
        try{old.setWebChromeClient(null);old.setWebViewClient(null);old.removeAllViews();old.destroy();}catch(Throwable ignored){}
    }

    @Override protected void onSaveInstanceState(Bundle out){ if(webView!=null)try{webView.saveState(out);}catch(Throwable ignored){} super.onSaveInstanceState(out); }
    @Override protected void onDestroy(){destroyed=true;destroyWebView();super.onDestroy();}
    @Override public void onBackPressed(){
        if(webView!=null && webView.canGoBack()) webView.goBack();
        else showGate();
    }
}
