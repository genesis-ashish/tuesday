import {Constructable} from '@microsoft/fast-element';
import {Container} from '@microsoft/fast-foundation';
import {Route, RouterConfiguration} from '@microsoft/fast-router';
import {
    Auth,
    FoundationAnalytics,
    FoundationAnalyticsEvent,
    FoundationAnalyticsEventType,
    Session,
} from '@genesislcap/foundation-comms';
import {defaultLayout, loginLayout} from './.layouts';
import {Login} from '@genesislcap/foundation-login';
import {Home} from './home/home';
import {NotFound} from './not-found/not-found';

type RouteSettings = {
  public?: boolean;
  foo?: string;
};

export class MainRouterConfig extends RouterConfiguration<RouteSettings> {
  constructor(
      @Auth private auth: Auth,
      @Container private container: Container,
      @FoundationAnalytics private analytics: FoundationAnalytics,
      @Session private session: Session,
  ) {
    super();
  }

  public configure() {
    this.title = 'hello-world';
    this.defaultLayout = defaultLayout;
    this.routes.map(
        {path: '', redirect: 'login'},
        {
          path: 'login',
          element: Login,
          title: 'Login',
          name: 'login',
          layout: loginLayout,
          settings: {
            public: true,
          },
          childRouters: true,
        },
        {path: 'protected', element: Home, title: 'Home', name: 'protected'},
        {path: 'not-found', element: NotFound, title: 'Not Found', name: 'not-found'},
    );

    const session = this.session;
    const auth = this.auth;
    const analytics = this.analytics;

    /**
     * Example of a FallbackRouteDefinition
     */
    this.routes.fallback(() => (this.auth.isLoggedIn ? {redirect: 'not-found'} : {redirect: 'login'}));

    /**
     * Example of a NavigationContributor
     */
    this.contributors.push({
      navigate: (phase) => {
        const settings = phase.route.settings;
        /**
         * TODO: Centralise
         * Suspect this should be done via createEventSink, but it's not fully clear how-to do that as no docs
         */
        this.analytics.trackEvent(FoundationAnalyticsEventType.routeChanged, <FoundationAnalyticsEvent.RouteChanged>{
          path: phase.route.endpoint.path,
        });

        /**
         * If public route don't block
         */
        if (settings && settings.public) {
          return;
        }

        /**
         * If logged in don't block
         */
        if (this.auth.isLoggedIn) {
          return;
        }

        /**
         * Otherwise route them to login
         */
        phase.cancel(() => {
          session.captureReturnUrl();
          Route.name.replace(phase.router, 'login');
        });

      },
    });
  }

  public construct<T>(Type: Constructable<T>): T {
    return this.container.get(Type) as T;
  }
}
