import { Controller } from "./Controller";
import { PreConstruct } from "../Interfaces";
import { ExpressServer } from "./ExpressServer";

/**
 * Create a controller to render HTML views
 */
export class HTMLController extends Controller implements PreConstruct {

    /**
     * Pre Constructor
     */
    public preConstruct() {
         // set the view engine to ejs
         ExpressServer.serverApp.set('view engine', 'ejs');
    }


    /**
     * Send a response from the renderer
     * @param view 
     * @param options 
     */
    protected success(view: string, options: any) {
        this.res.render(view, options);
    }

}