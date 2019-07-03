import graphene

from graphene_django.types import DjangoObjectType

from oakbike.models import Report


class ReportType(DjangoObjectType):
    class Meta:
        model = Report
        only_fields = (
            'id',
            'img_url',
            'lat',
            'lng',
            'contact',
            'description',
            'date_created',
            'source'
        )


class CreateReport(graphene.Mutation):
    id = graphene.UUID()

    class Arguments:
        img_url = graphene.String(required=False)
        lat = graphene.Float(required=False)
        lng = graphene.Float(required=False)
        contact = graphene.String(required=False)
        description = graphene.String(required=False)
        source = graphene.String(required=False)

    def mutate(self, info, **kwargs):
        r = Report.objects.create()
        img_url = kwargs.get('img_url')
        lat = kwargs.get('lat')
        lng = kwargs.get('lng')
        contact = kwargs.get('contact')
        description = kwargs.get('description')
        source = kwargs.get('source')

        if img_url:
            r.img_url = img_url
        if lat:
            r.lat = lat
        if lng:
            r.lng = lng
        if contact:
            r.contact = contact
        if description:
            r.description = description
        if source:
            r.source = source

        r.save()
        return CreateReport(id=r.id)


class Query(graphene.ObjectType):
    view_report = graphene.Field(ReportType, id=graphene.UUID())
    list_reports = graphene.List(ReportType)

    def resolve_view_report(self, info, **kwargs):
        report_id = kwargs.get('id', None)
        if report_id:
            return Report.objects.get(id=report_id)

    def resolve_list_reports(self, info, **kwargs):
        return Report.objects.all()


class Mutation(graphene.AbstractType):
    create_report = CreateReport.Field()
