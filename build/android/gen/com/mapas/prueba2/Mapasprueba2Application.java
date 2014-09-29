/* AUTO-GENERATED FILE.  DO NOT MODIFY.
 *
 * This class was automatically generated by
 * Appcelerator. It should not be modified by hand.
 */
package com.mapas.prueba2;

import org.appcelerator.kroll.runtime.v8.V8Runtime;

import org.appcelerator.kroll.KrollModule;
import org.appcelerator.kroll.KrollModuleInfo;
import org.appcelerator.kroll.KrollRuntime;
import org.appcelerator.kroll.util.KrollAssetHelper;
import org.appcelerator.titanium.TiApplication;
import org.appcelerator.titanium.TiRootActivity;

import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

import android.util.Log;

public final class Mapasprueba2Application extends TiApplication
{
	private static final String TAG = "Mapasprueba2Application";

	@Override
	public void onCreate()
	{
		super.onCreate();

		appInfo = new Mapasprueba2AppInfo(this);
		postAppInfo();



		V8Runtime runtime = new V8Runtime();


		runtime.addExternalModule("ti.map", ti.map.MapBootstrap.class);
	


		KrollRuntime.init(this, runtime);

		stylesheet = new ApplicationStylesheet();
		postOnCreate();


	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	

	



		// Custom modules
		KrollModuleInfo moduleInfo;
	
		

		moduleInfo = new KrollModuleInfo(
			"map", "ti.map", "f0d8fd44-86d2-4730-b67d-bd454577aeee", "2.1.4",
			"External version of Map module to support new Google Map v2 sdk", "Hieu Pham", "Apache Public License v2",
			"Copyright (c) 2013 by Appcelerator, Inc.");

		

		

		KrollModule.addCustomModuleInfo(moduleInfo);
	

	}

	@Override
	public void verifyCustomModules(TiRootActivity rootActivity)
	{

		org.appcelerator.titanium.TiVerify verify = new org.appcelerator.titanium.TiVerify(rootActivity, this);
		verify.verify();

	}
}
