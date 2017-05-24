import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { setStatusBarColors } from "./utils/status-bar-util";
import { AppModule } from "./app.module";

platformNativeScriptDynamic().bootstrapModule(AppModule);
setStatusBarColors();
